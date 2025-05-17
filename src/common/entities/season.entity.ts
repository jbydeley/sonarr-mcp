import { z } from 'zod';

export const SeasonSchema = z.object({
  seasonNumber: z.number(),
  monitored: z.boolean(),
});

export type Season = z.infer<typeof SeasonSchema>;
