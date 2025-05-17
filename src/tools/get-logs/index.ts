import type { LogsResponse } from '@/common/entities/log.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import { toUrlParams } from '@/common/to-url-params.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

export const enabled = true;

export const toolSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  sortKey: z.string().default('date'),
  sortDirection: z
    .enum(['default', 'ascending', 'descending'])
    .default('default'),
  level: z.enum(['debug', 'info', 'warning', 'error']).default('info'),
});

export type GetLogsDto = z.infer<typeof toolSchema>;

export const toolName = 'get-logs';
export const toolDescription = 'Get paginated logs from Sonarr';

export const toolHandler = async (
  data: GetLogsDto,
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(data);
  const logs = await sonarrHttpClient.get<LogsResponse>(
    `/api/v3/log?${params.toString()}`,
  );

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(logs),
      },
    ],
  };
};
