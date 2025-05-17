import type { Series } from '@/common/entities/series.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

export const enabled = true;

export const toolSchema = z.object({
  term: z.string().describe('The term to search for'),
});

export type SearchSeriesDto = z.infer<typeof toolSchema>;

export const toolName = 'search-series';
export const toolDescription = 'Search for a TV series by term';

export const toolHandler = async (
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
