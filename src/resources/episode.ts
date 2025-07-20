import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { Episode } from '@/common/entities/episode.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';

export const episodeResourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const episode = await sonarrHttpClient.get<Episode>(`/api/v3/episode/${id}`);

  return {
    contents: [
      {
        uri: uri.pathname,
        mimeType: 'application/json',
        text: JSON.stringify(episode),
      },
    ],
  };
};
