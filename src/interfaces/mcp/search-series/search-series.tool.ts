import type { ServerInterface } from "@/interfaces/mcp/server.interface.js";
import type { ToolInterface } from "@/interfaces/mcp/tool.interface.js";
import { SearchSeriesSchema } from "./search-series.schema.js";
import type { SeriesService } from "@/core/series/services/series.service.js";
import { searchSeriesHandler } from "./search-series.handler.js";

export class SearchSeriesTool implements ToolInterface {
  constructor(private readonly service: SeriesService) {}

  register(server: ServerInterface) {
    server.tool(
      "SearchSeries",
      "Search for a series",
      SearchSeriesSchema.shape,
      (input: SearchSeriesSchema) =>
        searchSeriesHandler(input, { seriesService: this.service })
    );
  }
}
