import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { Series } from "@/common/entities/series.entity.js";
import type { SearchSeriesDto } from "@/features/series/dtos/search-series.dto.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";

export const searchSeriesHandler = async ({
  term,
}: SearchSeriesDto): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const series = await sonarrHttpClient.get<Series[]>(
    `/api/v3/series/lookup?term=${term}`
  );

  return {
    content: series.map((s) => ({
      type: "text",
      text: JSON.stringify(s),
    })),
  };
};
