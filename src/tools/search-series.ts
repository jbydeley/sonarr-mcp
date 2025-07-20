import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import type { Series } from '@/common/entities/series.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';

export const searchSeriesSchema = z.object({
  term: z.string().describe('The term to search for'),
});

export type SearchSeriesDto = z.infer<typeof searchSeriesSchema>;

export const searchSeriesHandler = async (
  data: SearchSeriesDto,
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const series = await sonarrHttpClient.get<Series[]>(
    `/api/v3/series/lookup?term=${data.term}`,
  );

  return {
    content: series.map((s) => ({
      type: 'text',
      text: JSON.stringify(s),
    })),
  };
};
