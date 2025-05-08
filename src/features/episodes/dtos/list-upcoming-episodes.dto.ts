import { z } from "zod";

export const ListUpcomingEpisodesSchema = z.object({
  start: z.coerce.date().describe("The start date (ISO8601 string or JS Date)"),
  end: z.coerce.date().describe("The end date (ISO8601 string or JS Date)"),
  unmonitored: z.preprocess(
    (val) => (val === undefined ? false : val),
    z.boolean().describe("Whether to include unmonitored episodes")
  ),
  includeSeries: z.preprocess(
    (val) => (val === undefined ? false : val),
    z.boolean().describe("Whether to include series information")
  ),
  includeEpisodeFile: z.preprocess(
    (val) => (val === undefined ? false : val),
    z.boolean().describe("Whether to include episode file information")
  ),
  includeEpisodeImages: z.preprocess(
    (val) => (val === undefined ? false : val),
    z.boolean().describe("Whether to include episode images")
  ),
  tags: z.preprocess(
    (val) => (val === undefined ? [] : val),
    z.array(z.string()).describe("Optional tag IDs")
  ),
});

export type ListUpcomingEpisodesDto = z.infer<
  typeof ListUpcomingEpisodesSchema
>;
