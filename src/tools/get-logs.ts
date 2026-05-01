import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { createSonarrGateway, runSonarrTool } from '@/common/mcp-helpers.js';

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
  const gateway = createSonarrGateway();
  return runSonarrTool(gateway.getLogs(data));
};
