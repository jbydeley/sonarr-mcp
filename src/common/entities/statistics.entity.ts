import { z } from 'zod';

export const StatisticsSchema = z.object({
  seasonCount: z.number(),
  episodeFileCount: z.number(),
  episodeCount: z.number(),
  totalEpisodeCount: z.number(),
  sizeOnDisk: z.number(),
  percentOfEpisodes: z.number(),
});

export type Statistics = z.infer<typeof StatisticsSchema>;
