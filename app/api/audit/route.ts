import { NextRequest, NextResponse } from 'next/server';
import { auditSchema } from '@/lib/validations/audit';
import { rateLimiter } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendTeamNotification, sendClientConfirmation } from '@/lib/email';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SuccessResponse {
  success: true;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

type ApiResponse = SuccessResponse | ErrorResponse;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extracts the client IP from request headers.
 * Vercel sets `x-forwarded-for`; falls back to `x-real-ip`, then `'unknown'`.
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can be comma-separated; the first value is the client IP.
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * Flattens Zod validation errors into a `{ fieldName: "message" }` map.
 * For fields with multiple errors only the first message is kept.
 *
 * Uses `PropertyKey` for path elements because Zod 4 includes symbol
 * keys in its issue path type.
 */
function flattenZodErrors(error: {
  issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }>;
}): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path.map(String).join('.');
    if (!fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}

// ─── POST /api/audit ─────────────────────────────────────────────────────────

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    // ── 1. Parse body ──────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body.' },
        { status: 400 },
      );
    }

    // ── 2. Zod validation ──────────────────────────────────────────────────
    const parseResult = auditSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed.',
          errors: flattenZodErrors(parseResult.error),
        },
        { status: 400 },
      );
    }

    const data = parseResult.data;

    // ── 3. Honeypot check ──────────────────────────────────────────────────
    // The "website" field is a hidden input rendered in the form.
    // Legitimate users never see or fill it; bots auto-populate it.
    // If it contains any value we silently return 200 so the bot
    // believes the submission succeeded, but we discard the data.
    if (data.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ── 4. Rate limiting (Upstash) ─────────────────────────────────────────
    const clientIp = getClientIp(request);
    const { success: withinLimit } = await rateLimiter.limit(clientIp);

    if (!withinLimit) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 },
      );
    }

    // ── 5. Supabase insert → leads table ───────────────────────────────────
    // Audit-specific fields map directly to their own columns (no overloading):
    //   businessName → name         (primary identifier for the lead)
    //   primaryGoal  → primary_goal (dedicated column, added in migration)
    //   websiteUrl   → website_url  (dedicated column, added in migration)
    //   hearAboutUs  → hear_about_us (dedicated column, added in migration)
    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .insert({
        name: data.businessName,
        email: data.email,
        phone: data.phone,
        source: 'audit',
        primary_goal: data.primaryGoal,
        website_url: data.websiteUrl,
        hear_about_us: data.hearAboutUs,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
      });

    if (dbError) {
      console.error('[/api/audit] Supabase insert failed:', dbError);
      return NextResponse.json(
        {
          success: false,
          message: 'Something went wrong. Please try again.',
        },
        { status: 500 },
      );
    }

    // ── 6. Resend emails ───────────────────────────────────────────────────
    // INTENTIONAL DESIGN DECISION — non-blocking email delivery:
    //
    // At this point the lead is safely persisted in Supabase. Email
    // notifications (team + client) are a best-effort notification layer,
    // NOT a transactional guarantee. If Resend's API is temporarily down
    // or rate-limited, we must NOT fail the entire request and risk:
    //   • The client seeing an error and re-submitting (duplicate leads)
    //   • Losing the lead entirely from the client's perspective
    //
    // Instead we fire both emails in parallel, log any failures server-side
    // for ops visibility, and still return 200 to the client. The team can
    // always retrieve the lead from Supabase regardless of email delivery.
    const submittedAt = new Date().toISOString();

    const [teamResult, clientResult] = await Promise.allSettled([
      sendTeamNotification({
        source: 'audit',
        businessName: data.businessName,
        email: data.email,
        phone: data.phone,
        primaryGoal: data.primaryGoal,
        websiteUrl: data.websiteUrl,
        hearAboutUs: data.hearAboutUs,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        submittedAt,
      }),
      sendClientConfirmation(
        { source: 'audit', businessName: data.businessName },
        data.email,
      ),
    ]);

    if (teamResult.status === 'rejected') {
      console.error(
        '[/api/audit] Team notification email failed:',
        teamResult.reason,
      );
    }
    if (clientResult.status === 'rejected') {
      console.error(
        '[/api/audit] Client confirmation email failed:',
        clientResult.reason,
      );
    }

    // ── 7. Success response ────────────────────────────────────────────────
    // Per spec: return {success: true} only — the form shows an inline
    // success message; no redirect.
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    // Catch-all for unexpected errors — never expose internals to the client.
    console.error('[/api/audit] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
