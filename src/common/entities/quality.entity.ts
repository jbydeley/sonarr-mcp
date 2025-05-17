import { z } from 'zod';

export const QualitySchema = z.object({
  id: z.number(),
  name: z.string(),
  source: z.string(),
  resolution: z.number(),
  modifier: z.string().optional(),
});

export type Quality = z.infer<typeof QualitySchema>;
