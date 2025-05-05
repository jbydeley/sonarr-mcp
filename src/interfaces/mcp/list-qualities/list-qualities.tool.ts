import type { ToolInterface } from "@/interfaces/mcp/tool.interface.js";
import type { QualityService } from "@/core/quality/services/quality.service.js";
import type { ServerInterface } from "@/interfaces/mcp/server.interface.js";
import { ListQualitiesSchema } from "./list-qualities.schema.js";
import { listQualitiesHandler } from "./list-qualities.handler.js";

export class ListQualitiesTool implements ToolInterface {
  constructor(private readonly qualityService: QualityService) {}

  register(server: ServerInterface) {
    server.tool(
      "ListQualities",
      "List qualities",
      ListQualitiesSchema.shape,
      (input: ListQualitiesSchema) =>
        listQualitiesHandler(input, { qualityService: this.qualityService })
    );
  }
}
