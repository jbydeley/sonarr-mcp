import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { GetEpisodesDto } from "@/features/episodes/dtos/get-episodes.dto.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { Episode } from "@/common/entities/episode.entity.js";
import { toUrlParams } from "@/common/to-url-params.js";

export const getEpisodesHandler = async (
  data: GetEpisodesDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(data);

  const episodes = await sonarrHttpClient.get<Episode[]>(
    `/api/v3/episode?${params.toString()}`
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(episodes),
      },
    ],
  };
};
