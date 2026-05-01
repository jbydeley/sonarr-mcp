import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { runSonarrTool } from '@/common/mcp-helpers.js';

export const findEpisodesSchema = z.object({
  seriesId: z.number().int().positive().describe('The ID of the series'),
  seasonNumber: z.number().int().positive().optional().describe('The season number'),
  episodeFileId: z.number().int().positive().optional().describe('The episode file ID'),
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
  return runSonarrTool((gateway) => gateway.findEpisodes(data));
};
