import { z } from "zod";

export const ListUpcomingEpisodesSchema = z.object({
  start: z.coerce.date().describe("The start date (ISO8601 string or JS Date)"),
  end: z.coerce.date().describe("The end date (ISO8601 string or JS Date)"),
  unmonitored: z.boolean().optional().default(false),
  includeSeries: z.boolean().optional().default(false),
  includeEpisodeFile: z.boolean().optional().default(false),
  includeEpisodeImages: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
});

export type ListUpcomingEpisodesSchema = z.infer<
  typeof ListUpcomingEpisodesSchema
>;
