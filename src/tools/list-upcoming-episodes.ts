import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { runSonarrTool } from '@/common/mcp-helpers.js';

export const listUpcomingEpisodesSchema = z
  .object({
    start: z
      .string()
      .datetime()
      .default(new Date().toISOString())
      .describe('The start date (ISO8601 string)'),
    end: z
      .string()
      .datetime()
      .default(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      .describe('The end date (ISO8601 string)'),
    unmonitored: z
      .boolean()
      .default(false)
      .describe('Whether to include unmonitored episodes'),
    includeSeries: z
      .boolean()
      .default(false)
      .describe('Whether to include series information'),
    includeEpisodeFile: z
      .boolean()
      .default(false)
      .describe('Whether to include episode file information'),
    includeEpisodeImages: z
      .boolean()
      .default(false)
      .describe('Whether to include episode images'),
    tags: z.array(z.string()).nullish().describe('Optional tag IDs'),
  })
  .refine((data) => new Date(data.start) <= new Date(data.end), {
    message: 'Start date must be before or equal to end date',
  });

export type ListUpcomingEpisodesDto = z.infer<
  typeof listUpcomingEpisodesSchema
>;

export const listUpcomingEpisodesHandler = async (
  data: ListUpcomingEpisodesDto,
): Promise<CallToolResult> => {
  return runSonarrTool((gateway) => gateway.listUpcomingEpisodes(data));
};
