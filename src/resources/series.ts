import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { Series } from '@/common/entities/series.entity.js';
import { runSonarrResource } from '@/common/mcp-helpers.js';

export const seriesResourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const series = await runSonarrResource<Series>((client) =>
    client.get(`/api/v3/series/${id}`),
  );

  return {
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(series),
      },
    ],
  };
};
