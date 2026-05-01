import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { runSonarrTool } from '@/common/mcp-helpers.js';

export const searchSeriesSchema = z.object({
  term: z.string().describe('The term to search for'),
});

export type SearchSeriesDto = z.infer<typeof searchSeriesSchema>;

export const searchSeriesHandler = async (
  data: SearchSeriesDto,
): Promise<CallToolResult> => {
  return runSonarrTool(
    (gateway) => gateway.searchSeries(data.term),
    (series) => ({
      content: series.map((s) => ({
        type: 'text',
        text: JSON.stringify(s),
      })),
    }),
  );
};
