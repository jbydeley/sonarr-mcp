import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { Series } from "@/common/entities/series.entity.js";

export const searchSeriesSchema = z.object({
  term: z.string().describe("The term to search for"),
});

export type SearchSeriesDto = z.infer<typeof searchSeriesSchema>;

export const searchSeriesToolName = "search-series";
export const searchSeriesToolDescription = "Search for a TV series by term";

export const searchSeriesToolHandler = async (
  data: SearchSeriesDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const series = await sonarrHttpClient.get<Series[]>(
    `/api/v3/series/lookup?term=${data.term}`
  );

  return {
    content: series.map((s) => ({
      type: "text",
      text: JSON.stringify(s),
    })),
  };
};
