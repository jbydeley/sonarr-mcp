import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import type { Episode } from '@/common/entities/episode.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import { toUrlParams } from '@/common/to-url-params.js';

export const findEpisodesSchema = z.object({
  seriesId: z.number().describe('The ID of the series'),
  seasonNumber: z.number().optional().describe('The season number'),
  episodeFileId: z.number().optional().describe('The episode file ID'),
  includeSeries: z
    .boolean()
    .optional()
    .describe('Whether to include series information'),
  includeEpisodeFile: z
    .boolean()
    .optional()
    .describe('Whether to include episode file information'),
  includeEpisodeImages: z
    .boolean()
    .optional()
    .describe('Whether to include episode images'),
});

export type FindEpisodesDto = z.infer<typeof findEpisodesSchema>;

export const findEpisodesHandler = async (
  data: FindEpisodesDto,
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(data);
  const episodes = await sonarrHttpClient.get<Episode[]>(
    `/api/v3/episode?${params.toString()}`,
  );

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(episodes),
      },
    ],
  };
};
