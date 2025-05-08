import { z } from "zod";

export const QualityProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  upgradeAllowed: z.boolean(),
  cutoff: z.number(),
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      quality: z.object({
        id: z.number(),
        name: z.string(),
        source: z.string(),
        resolution: z.number(),
      }),
      items: z.array(z.string()),
      allowed: z.boolean(),
    })
  ),
  minFormatScore: z.number(),
  cutoffFormatScore: z.number(),
  minUpgradeFormatScore: z.number(),
  formatItems: z.array(
    z.object({
      id: z.number(),
      format: z.number(),
      name: z.string(),
      score: z.number(),
    })
  ),
});

export type QualityProfile = z.infer<typeof QualityProfileSchema>;
