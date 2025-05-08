import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { toUrlParams } from "@/common/to-url-params.js";
import { Episode } from "@/common/entities/episode.entity.js";

export const findEpisodesSchema = z.object({
  seriesId: z.number().describe("The ID of the series"),
  seasonNumber: z.number().optional().describe("The season number"),
  episodeIds: z
    .array(z.number())
    .nullish()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  episodeFileId: z.number().optional().describe("The episode file ID"),
  includeSeries: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to include series information"),
  includeEpisodeFile: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to include episode file information"),
  includeEpisodeImages: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether to include episode images"),
});

export type FindEpisodesDto = z.infer<typeof findEpisodesSchema>;

export const findEpisodesToolName = "find-episodes";
export const findEpisodesToolDescription = "Find episodes in Sonarr";

export const findEpisodesToolHandler = async (
  data: FindEpisodesDto
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
