import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import type { Series } from '@/common/entities/series.entity.js';
import { runSonarrTool } from '@/common/mcp-helpers.js';

export const searchSeriesSchema = z.object({
  term: z.string().describe('The term to search for'),
});

export type SearchSeriesDto = z.infer<typeof searchSeriesSchema>;

export const searchSeriesHandler = async (
  data: SearchSeriesDto,
): Promise<CallToolResult> => {
  const params = new URLSearchParams({ term: data.term });
  return runSonarrTool(
    (client) => client.get<Series[]>(`/api/v3/series/lookup?${params.toString()}`),
    (series) => ({
      content: series.map((s) => ({
        type: 'text',
        text: JSON.stringify(s),
      })),
    }),
  );
};
