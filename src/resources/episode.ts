import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { createSonarrGateway } from '@/common/mcp-helpers.js';

export const episodeResourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const gateway = createSonarrGateway();
  const episode = await gateway.getEpisode(String(id));

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
