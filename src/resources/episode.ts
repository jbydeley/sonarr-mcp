import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { Episode } from '@/common/entities/episode.entity.js';
import { runSonarrResource } from '@/common/mcp-helpers.js';

export const episodeResourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const episode = await runSonarrResource<Episode>((client) =>
    client.get(`/api/v3/episode/${id}`),
  );

  return {
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(episode),
      },
    ],
  };
};
