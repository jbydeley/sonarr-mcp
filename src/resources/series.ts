import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { Series } from '@/common/entities/series.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';

export const seriesResourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const series = await sonarrHttpClient.get<Series>(`/api/v3/series/${id}`);

  return {
    contents: [
      {
        uri: uri.pathname,
        mimeType: 'application/json',
        text: JSON.stringify(series),
      },
    ],
  };
};
