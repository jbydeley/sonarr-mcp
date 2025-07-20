import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import type { HistoryRecord } from '@/common/entities/history-record.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import { toUrlParams } from '@/common/to-url-params.js';

export const eventTypes = [
  'Unknown',
  'Grabbed',
  'SeriesFolderImported',
  'DownloadFolderImported',
  'DownloadFailed',
  'EpisodeFileDeleted',
  'EpisodeFileRenamed',
  'DownloadIgnored',
] as const;

export const listRecentDownloadsSchema = z.object({
  page: z.number().default(1).describe('The page number'),
  pageSize: z.number().default(10).describe('The page size'),
  sortKey: z.string().default('date').describe('The sort key'),
  sortDirection: z
    .enum(['default', 'ascending', 'descending'])
    .default('default')
    .describe('The sort direction'),
  includeSeries: z
    .boolean()
    .default(false)
    .describe('Whether to include series information'),
  includeEpisode: z
    .boolean()
    .default(false)
    .describe('Whether to include episode information'),
  eventType: z
    .array(z.enum(eventTypes))
    .nullish()
    .transform((val) => {
      if (!val || val.length === 0) return undefined;
      return val.map((eventType) => eventTypes.indexOf(eventType));
    })
    .describe('The event types'),
  seriesIds: z.array(z.number()).nullish().describe('The series IDs'),
  quality: z.array(z.number()).nullish().describe('The quality IDs'),
});

export type ListRecentDownloadsDto = z.infer<typeof listRecentDownloadsSchema>;

export const listRecentDownloadsHandler = async (
  data: ListRecentDownloadsDto,
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(data);
  const recentDownloads = await sonarrHttpClient.get<HistoryRecord[]>(
    `/api/v3/history?${params.toString()}`,
  );

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(recentDownloads),
      },
    ],
  };
};
