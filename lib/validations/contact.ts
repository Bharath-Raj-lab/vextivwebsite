import { z } from 'zod';

// ─── Enum values (must match PRD Section 5.6 dropdown options exactly) ────────

const SERVICE_OPTIONS = [
  'Website Development',
  'QR Ordering System',
  'Branding & Identity',
  'Social Media Management',
  'Content Creation',
  'Local SEO',
  'AI Integration',
  'Other',
] as const;

const BUDGET_OPTIONS = [
  'Under ₹10,000',
  '₹10,000–₹25,000',
  '₹25,000–₹50,000',
  '₹50,000+',
  "Let's discuss",
] as const;

// ─── Contact form Zod schema ─────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be 100 characters or fewer'),

  email: z
    .string({ message: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(254, 'Email must be 254 characters or fewer')
    .transform((v) => v.toLowerCase()),

  phone: z
    .string({ message: 'Phone number is required' })
    .trim()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number must be 20 characters or fewer'),

  company: z
    .string()
    .trim()
    .max(100, 'Company name must be 100 characters or fewer')
    .nullish()
    .transform((v) => v ?? null),

  service: z
    .enum(SERVICE_OPTIONS, { message: 'Please select a valid service' })
    .nullish()
    .transform((v) => v ?? null),

  budget: z
    .enum(BUDGET_OPTIONS, { message: 'Please select a valid budget range' })
    .nullish()
    .transform((v) => v ?? null),

  brief: z
    .string()
    .trim()
    .max(2000, 'Brief must be 2000 characters or fewer')
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

export type ContactFormData = z.infer<typeof contactSchema>;
