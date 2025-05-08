import { ToolRegistration } from "@/common/types.js";
import { AddSeriesDto } from "@/features/series/dtos/add-series.dto.js";
import { AddSeriesSchema } from "@/features/series/dtos/add-series.dto.js";
import { addSeriesHandler } from "./add-series.handler.js";

export const AddSeriesToolName = "AddSeries";
export const AddSeriesToolDescription = "Add a series";
export const AddSeriesToolSchema = AddSeriesSchema.shape;
export const AddSeriesToolHandler = addSeriesHandler;

export const addSeriesToolRegistration: ToolRegistration<AddSeriesDto> = {
  name: AddSeriesToolName,
  description: AddSeriesToolDescription,
  schema: AddSeriesToolSchema,
  handler: AddSeriesToolHandler,
};
