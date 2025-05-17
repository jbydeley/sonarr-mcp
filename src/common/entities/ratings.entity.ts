import { z } from 'zod';

export const RatingsSchema = z.object({
  votes: z.number(),
  value: z.number(),
});

export type Ratings = z.infer<typeof RatingsSchema>;
