import type { SeriesRepository } from "../ports/series.repository.js";
import type { Series } from "../entities/series.entity.js";
import type { SearchSeriesSchema } from "@/interfaces/mcp/search-series/search-series.schema.js";

export class SearchSeriesUseCase {
  constructor(
    private readonly seriesRepository: Pick<SeriesRepository, "searchSeries">
  ) {}

  async execute(input: SearchSeriesSchema): Promise<Series[]> {
    return this.seriesRepository.searchSeries(input.term);
  }
}
