import type { Series } from "../entities/series.entity";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema";

export interface SeriesRepository {
  addSeries(series: AddSeriesSchema): Promise<Series>;
  searchSeries(term: string): Promise<Series[]>;
}
