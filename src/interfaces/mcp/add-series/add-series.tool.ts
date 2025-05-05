import type { ServerInterface } from "@/interfaces/mcp/server.interface.js";
import type { ToolInterface } from "@/interfaces/mcp/tool.interface.js";
import type { SeriesService } from "@/core/series/services/series.service.js";
import { AddSeriesSchema } from "./add-series.schema.js";
import { addSeriesHandler } from "./add-series.handler.js";

export class AddSeriesTool implements ToolInterface {
  constructor(private readonly service: SeriesService) {}

  register(server: ServerInterface) {
    server.tool(
      "AddSeries",
      "Add a series",
      AddSeriesSchema.shape,
      (input: AddSeriesSchema) =>
        addSeriesHandler(input, { seriesService: this.service })
    );
  }
}
