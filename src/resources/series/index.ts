import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { Series } from "@/common/entities/series.entity.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

export const enabled = true;

export const resourceName = "series";
export const resourceUri = new ResourceTemplate("sonarr://series/{id}", {
  list: undefined,
});

export const resourceHandler = async (
  uri: URL,
  { id }: Record<string, string | string[] | undefined>,
  _extra: any
): Promise<ReadResourceResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const series = await sonarrHttpClient.get<Series>(`/api/v3/series/${id}`);

  return {
    contents: [
      {
        uri: uri.pathname,
        mimeType: "application/json",
        text: JSON.stringify(series),
      },
    ],
  };
};
