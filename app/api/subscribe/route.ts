import { NextRequest, NextResponse } from 'next/server';
import { subscribeSchema } from '@/lib/validations/subscribe';
import { rateLimiter } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendNewsletterConfirmation } from '@/lib/email';
import { logger } from '@/logger';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
    }

    const parseResult = subscribeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Honeypot check
    if (data.website) {
      return NextResponse.json(
        { success: true, message: 'Subscribed successfully' },
        { status: 200 }
      );
    }

    // Rate Limiting
    const clientIp = getClientIp(request);
    const { success: withinLimit } = await rateLimiter.limit(clientIp);
    if (!withinLimit) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Supabase Insert
    const { error: dbError } = await supabaseAdmin
  .from('leads')
  .insert({ email: data.email, name: '' });

    if (dbError) {
      if (dbError.code === '23505') { // Unique constraint violation code
        return NextResponse.json(
          { success: true, message: "You're already subscribed!" },
          { status: 200 } // Return 200 per PRD
        );
      }
      logger.error('[/api/subscribe] Supabase insert failed:', dbError);
      return NextResponse.json(
        { success: false, message: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email
    const emailResult = await Promise.allSettled([
      sendNewsletterConfirmation(data.email)
    ]);

    if (emailResult[0].status === 'rejected') {
      logger.error('[/api/subscribe] Resend notification email failed:', emailResult[0].reason);
    }

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error('[/api/subscribe] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
