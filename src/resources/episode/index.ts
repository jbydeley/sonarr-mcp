import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Episode } from "@/common/entities/episode.entity.js";

export const episodeResourceName = "episode";
export const episodeResourceUriTemplate = new ResourceTemplate(
  "sonarr://episode/{id}",
  {
    list: undefined,
  }
);

export const episodeResourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: any
): Promise<ReadResourceResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const episode = await sonarrHttpClient.get<Episode>(`/api/v3/episode/${id}`);

  return {
    contents: [
      {
        uri: uri.pathname,
        mimeType: "application/json",
        text: JSON.stringify(episode),
      },
    ],
  };
};
