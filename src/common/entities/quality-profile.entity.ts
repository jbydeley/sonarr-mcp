import { z } from 'zod';
import { CustomFormatSchema } from './custom-format.entity.js';
import { QualitySchema } from './quality.entity.js';

export const QualityProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  upgradeAllowed: z.boolean(),
  cutoff: z.number(),
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      quality: QualitySchema,
      items: z.array(z.string()),
      allowed: z.boolean(),
    }),
  ),
  minFormatScore: z.number(),
  cutoffFormatScore: z.number(),
  minUpgradeFormatScore: z.number(),
  formatItems: z.array(CustomFormatSchema),
});

export type QualityProfile = z.infer<typeof QualityProfileSchema>;
