import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { toUrlParams } from "@/common/to-url-params.js";
import { Episode } from "@/common/entities/episode.entity.js";

export const enabled = true;

export const toolSchema = z.object({
  start: z.coerce
    .date()
    .default(new Date())
    .describe("The start date (ISO8601 string or JS Date)"),
  end: z.coerce
    .date()
    .default(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    .describe("The end date (ISO8601 string or JS Date)"),
  unmonitored: z
    .boolean()
    .default(false)
    .describe("Whether to include unmonitored episodes"),
  includeSeries: z
    .boolean()
    .default(false)
    .describe("Whether to include series information"),
  includeEpisodeFile: z
    .boolean()
    .default(false)
    .describe("Whether to include episode file information"),
  includeEpisodeImages: z
    .boolean()
    .default(false)
    .describe("Whether to include episode images"),
  tags: z.array(z.string()).nullish().describe("Optional tag IDs"),
});

export type ListUpcomingEpisodesDto = z.infer<typeof toolSchema>;

export const toolName = "list-upcoming-episodes";
export const toolDescription = "List upcoming episodes from sonarr";

export const toolHandler = async (
  data: ListUpcomingEpisodesDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(data);

  params.set("start", data.start.toISOString());
  params.set("end", data.end.toISOString());

  const upcomingEpisodes = await sonarrHttpClient.get<Episode[]>(
    `/api/v3/calendar?${params.toString()}`
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(upcomingEpisodes),
      },
    ],
  };
};
