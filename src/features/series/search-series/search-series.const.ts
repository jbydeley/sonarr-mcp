import { ToolRegistration } from "@/common/types.js";
import {
  SearchSeriesDto,
  SearchSeriesSchema,
} from "@/features/series/dtos/search-series.dto.js";
import { searchSeriesHandler } from "./search-series.handler.js";

export const SearchSeriesToolName = "SearchSeries";
export const SearchSeriesToolDescription = "Search for series";
export const SearchSeriesToolSchema = SearchSeriesSchema;
export const SearchSeriesToolHandler = searchSeriesHandler;

export const searchSeriesToolRegistration: ToolRegistration<SearchSeriesDto> = {
  name: SearchSeriesToolName,
  description: SearchSeriesToolDescription,
  schema: SearchSeriesToolSchema.shape,
  handler: SearchSeriesToolHandler,
};
