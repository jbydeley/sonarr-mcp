import type { Series } from "../entities/series.entity.js";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema.js";
import type { TvdbIdVo } from "../value-objects/tvdb-id.vo.js";

export interface SeriesRepository {
  addSeries(id: TvdbIdVo, series: AddSeriesSchema): Promise<Series>;
  searchSeries(term: string): Promise<Series[]>;
}
