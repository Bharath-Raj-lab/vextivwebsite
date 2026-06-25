import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  website: z.string().optional(), // Honeypot field
});
