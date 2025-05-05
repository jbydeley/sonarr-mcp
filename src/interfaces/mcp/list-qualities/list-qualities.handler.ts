import { ListQualitiesSchema } from "./list-qualities.schema.js";
import type { QualityService } from "@/core/quality/services/quality.service.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const listQualitiesHandler = async (
  _input: ListQualitiesSchema,
  deps: { qualityService: Pick<QualityService, "listQualities"> }
): Promise<CallToolResult> => {
  const qualities = await deps.qualityService.listQualities();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(qualities),
      },
    ],
  };
};
