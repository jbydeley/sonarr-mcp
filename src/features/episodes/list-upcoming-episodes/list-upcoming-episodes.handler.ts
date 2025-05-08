import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { Episode } from "@/common/entities/episode.entity.js";
import { ListUpcomingEpisodesDto } from "@/features/episodes/dtos/list-upcoming-episodes.dto.js";
import { toUrlParams } from "@/common/to-url-params.js";

export const listUpcomingEpisodesHandler = async (
  input: ListUpcomingEpisodesDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(input);

  params.set("start", input.start.toISOString());
  params.set("end", input.end.toISOString());

  const queryString = params.toString();

  const url = `/api/v3/calendar${queryString ? `?${queryString}` : ""}`;

  const episodes = await sonarrHttpClient.get<Episode[]>(url);

  return {
    content: episodes.map((episode) => ({
      type: "text",
      text: JSON.stringify(episode),
    })),
  };
};
