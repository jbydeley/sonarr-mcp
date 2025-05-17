import type { Episode } from '@/common/entities/episode.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';

export const enabled = true;

export const resourceName = 'episode';
export const resourceUri = new ResourceTemplate('sonarr://episode/{id}', {
  list: undefined,
});

export const resourceHandler = async (
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
