import type { SeriesService } from "@/core/series/services/series.service.js";
import type { AddSeriesSchema } from "./add-series.schema.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { TvdbIdVo } from "@/core/series/value-objects/tvdb-id.vo.js";

export const addSeriesHandler = async (
  input: AddSeriesSchema,
  deps: { seriesService: Pick<SeriesService, "addSeries"> }
): Promise<CallToolResult> => {
  const series = await deps.seriesService.addSeries(
    new TvdbIdVo(input.tvdbId),
    input
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(series),
      },
    ],
  };
};
