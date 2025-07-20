import type { Series } from '@/common/entities/series.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

export const addSeriesSchema = z.object({
  title: z.string().describe('The title of the show to add'),
  tvdbId: z.number().min(1).describe('The TVDB ID of the show to add'),
  qualityProfileId: z
    .number()
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
    .optional()
    .describe('Optional language profile ID'),
  tags: z.array(z.number()).optional().describe('Optional tag IDs'),
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
  const sonarrHttpClient = new SonarrHttpClient();

  const series = await sonarrHttpClient.post<Series>('/api/v3/series', data).catch(err => console.error(err));

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(series),
      },
    ],
  };
};
