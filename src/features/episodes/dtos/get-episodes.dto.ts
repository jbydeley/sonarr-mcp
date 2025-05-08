import { z } from "zod";

export const GetEpisodesSchema = z.object({
  seriesId: z.number().describe("The ID of the series"),
  seasonNumber: z.number().optional().describe("The season number"),
  episodeIds: z.array(z.number()).optional().describe("The episode IDs"),
  episodeFileId: z.number().optional().describe("The episode file ID"),
  includeSeries: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to include series information"),
  includeEpisodeFile: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to include episode file information"),
  includeEpisodeImages: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to include episode images"),
});

export type GetEpisodesDto = z.infer<typeof GetEpisodesSchema>;
