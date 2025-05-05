import type { SeriesRepository } from "../ports/series.repository";
import type { Series } from "../entities/series.entity";
import type { SearchSeriesSchema } from "@/interfaces/mcp/search-series/search-series.schema";

export class SearchSeriesUseCase {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async execute(input: SearchSeriesSchema): Promise<Series[]> {
    return this.seriesRepository.searchSeries(input.term);
  }
}
