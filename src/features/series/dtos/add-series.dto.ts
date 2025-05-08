import { z } from "zod";

export const AddSeriesSchema = z.object({
  title: z.string().describe("The title of the show to add"),
  tvdbId: z.number().min(1).describe("The TVDB ID of the show to add"),
  qualityProfileId: z
    .number()
    .default(1)
    .describe("The Sonarr quality profile ID to use"),
  rootFolderPath: z
    .string()
    .default("/tv")
    .describe("The folder where Sonarr stores the series"),
  monitored: z
    .boolean()
    .default(true)
    .describe("Whether the series is monitored"),
  seasonFolder: z
    .boolean()
    .default(true)
    .describe("Whether to use season folders"),
  languageProfileId: z
    .number()
    .optional()
    .describe("Optional language profile ID"),
  tags: z.array(z.number()).optional().describe("Optional tag IDs"),
  addOptions: z
    .object({
      searchForMissingEpisodes: z.boolean().default(true),
    })
    .default({ searchForMissingEpisodes: true }),
});

export type AddSeriesDto = z.infer<typeof AddSeriesSchema>;
