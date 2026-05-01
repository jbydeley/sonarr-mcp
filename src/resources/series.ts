import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { runSonarrResource } from '@/common/mcp-helpers.js';

export const seriesResourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const series = await runSonarrResource((gateway) => gateway.getSeries(String(id)));

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
