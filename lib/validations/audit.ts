import { z } from 'zod';

// ─── Enum values (must match PRD Section 5.7 dropdown options exactly) ────────

const PRIMARY_GOAL_OPTIONS = [
  'Get more customers online',
  'Improve my website',
  'Boost local SEO',
  'Build a brand identity',
  'Launch a new product',
  'Other',
] as const;

const HEAR_ABOUT_US_OPTIONS = [
  'Google Search',
  'Instagram',
  'Facebook',
  'LinkedIn',
  'Referral',
  'Other',
] as const;

// ─── Audit form Zod schema ────────────────────────────────────────────────────

export const auditSchema = z.object({
  businessName: z
    .string({ message: 'Business name is required' })
    .trim()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must be 100 characters or fewer'),

  websiteUrl: z
    .string()
    .trim()
    .max(500, 'Website URL must be 500 characters or fewer')
    .url('Please enter a valid URL (e.g. https://example.com)')
    .nullish()
    .transform((v) => v ?? null),

  primaryGoal: z.enum(PRIMARY_GOAL_OPTIONS, {
    message: 'Please select a valid primary goal',
  }),

  phone: z
    .string({ message: 'Phone number is required' })
    .trim()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number must be 20 characters or fewer'),

  email: z
    .string({ message: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(254, 'Email must be 254 characters or fewer')
    .transform((v) => v.toLowerCase()),

  hearAboutUs: z
    .enum(HEAR_ABOUT_US_OPTIONS, { message: 'Please select a valid option' })
    .nullish()
    .transform((v) => v ?? null),

  // Honeypot — hidden field rendered in the form but invisible to humans.
  // Bots auto-fill it; if non-empty we silently discard the submission.
  website: z.string().optional().default(''),

  // UTM attribution params forwarded from the client-side URL
  utm_source: z
    .string()
    .trim()
    .max(200, 'utm_source too long')
    .nullish()
    .transform((v) => v ?? null),

  utm_medium: z
    .string()
    .trim()
    .max(200, 'utm_medium too long')
    .nullish()
    .transform((v) => v ?? null),

  utm_campaign: z
    .string()
    .trim()
    .max(200, 'utm_campaign too long')
    .nullish()
    .transform((v) => v ?? null),
});

// ─── Derived TypeScript type ─────────────────────────────────────────────────

export type AuditFormData = z.infer<typeof auditSchema>;
