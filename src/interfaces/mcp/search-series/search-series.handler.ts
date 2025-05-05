import type { SearchSeriesSchema } from "./search-series.schema.js";
import type { SeriesService } from "@/core/series/services/series.service.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const searchSeriesHandler = async (
  input: SearchSeriesSchema,
  deps: { seriesService: Pick<SeriesService, "searchSeries"> }
): Promise<CallToolResult> => {
  const series = await deps.seriesService.searchSeries(input);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(series),
      },
    ],
  };
};
