import type { ServerInterface } from "@/interfaces/mcp/server.interface.js";
import type { ToolInterface } from "@/interfaces/mcp/tool.interface.js";
import { SearchSeriesSchema } from "./search-series.schema.js";
import type { SeriesService } from "@/core/series/services/series.service.js";

export class SearchSeriesTool implements ToolInterface {
  constructor(private readonly service: SeriesService) {}

  register(server: ServerInterface) {
    server.tool(
      "SearchSeries",
      "Search for a series",
      SearchSeriesSchema.shape,
      async (input: SearchSeriesSchema) => {
        const series = await this.service.searchSeries(input);

        return {
          content: series.map((s) => ({
            type: "text",
            text: JSON.stringify(s),
          })),
        };
      }
    );
  }
}
