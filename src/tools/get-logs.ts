import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import type { LogsResponse } from '@/common/entities/log.entity.js';
import { runSonarrTool } from '@/common/mcp-helpers.js';
import { toUrlParams } from '@/common/to-url-params.js';

export const getLogsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(250).default(10),
  sortKey: z.string().default('date'),
  sortDirection: z
    .enum(['default', 'ascending', 'descending'])
    .default('default'),
  level: z.enum(['debug', 'info', 'warning', 'error']).default('info'),
});

export type GetLogsDto = z.infer<typeof getLogsSchema>;

export const getLogsHandler = async (
  data: GetLogsDto,
): Promise<CallToolResult> => {
  const params = toUrlParams(data);
  return runSonarrTool((client) =>
    client.get<LogsResponse>(`/api/v3/log?${params.toString()}`),
  );
};
