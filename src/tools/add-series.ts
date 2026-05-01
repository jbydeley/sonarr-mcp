import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { runSonarrTool } from '@/common/mcp-helpers.js';

export const addSeriesSchema = z.object({
  title: z.string().describe('The title of the show to add'),
  tvdbId: z.number().int().positive().describe('The TVDB ID of the show to add'),
  qualityProfileId: z
    .number()
    .int()
    .positive()
    .default(1)
    .describe('The Sonarr quality profile ID to use'),
  rootFolderPath: z
    .string()
    .default('/tv')
    .describe('The folder where Sonarr stores the series'),
  monitored: z
    .boolean()
    .default(true)
    .describe('Whether the series is monitored'),
  seasonFolder: z
    .boolean()
    .default(true)
    .describe('Whether to use season folders'),
  languageProfileId: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Optional language profile ID'),
  tags: z.array(z.number().int().positive()).optional().describe('Optional tag IDs'),
  addOptions: z
    .object({
      searchForMissingEpisodes: z.boolean().default(true),
    })
    .default({ searchForMissingEpisodes: true }),
});

export type AddSeriesDto = z.infer<typeof addSeriesSchema>;

export const addSeriesHandler = async (
  data: AddSeriesDto,
): Promise<CallToolResult> => {
  return runSonarrTool((gateway) => gateway.addSeries(data));
};
