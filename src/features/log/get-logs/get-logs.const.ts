import { getLogsHandler } from "./get-logs.handler.js";
import { GetLogsDto, GetLogsSchema } from "@/features/log/dtos/get-logs.dto.js";
import { ToolRegistration } from "@/common/types.js";

export const GetLogsToolName = "GetLogs";
export const GetLogsToolDescription = "Get logs";
export const GetLogsToolHandler = getLogsHandler;
export const GetLogsToolSchema = GetLogsSchema.shape;

export const getLogsToolRegistration: ToolRegistration<GetLogsDto> = {
  name: GetLogsToolName,
  description: GetLogsToolDescription,
  schema: GetLogsToolSchema,
  handler: GetLogsToolHandler,
};
