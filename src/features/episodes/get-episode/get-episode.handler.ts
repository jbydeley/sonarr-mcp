import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { GetEpisodeDto } from "@/features/episodes/dtos/get-episode.dto.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { Episode } from "@/common/entities/episode.entity.js";

export const getEpisodeHandler = async (
  data: GetEpisodeDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const episode = await sonarrHttpClient.get<Episode>(
    `/api/v3/episode/${data.id}`
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(episode),
      },
    ],
  };
};
