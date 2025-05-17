import type { Episode } from '@/common/entities/episode.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import { toUrlParams } from '@/common/to-url-params.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

export const enabled = true;

export const toolSchema = z.object({
  seriesId: z.number().describe('The ID of the series'),
  seasonNumber: z.number().optional().describe('The season number'),
  episodeIds: z.array(z.number()).optional().nullish(),
  episodeFileId: z.number().optional().describe('The episode file ID'),
  includeSeries: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to include series information'),
  includeEpisodeFile: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to include episode file information'),
  includeEpisodeImages: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to include episode images'),
});

export type FindEpisodesDto = z.infer<typeof toolSchema>;

export const toolName = 'find-episodes';
export const toolDescription = 'Find episodes in Sonarr';

export const toolHandler = async (
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
