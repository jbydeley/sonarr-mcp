import type { SeriesRepository } from "../ports/series.repository";
import type { Series } from "../entities/series.entity";
import type { SearchSeriesSchema } from "@/interfaces/mcp/search-series/search-series.schema";
import { SearchSeriesUseCase } from "../use-cases/search-series.usecase";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema";
import { AddSeriesUseCase } from "../use-cases/add-series.usecase";

export class SeriesService {
  private readonly searchSeriesUseCase: SearchSeriesUseCase;
  private readonly addSeriesUseCase: AddSeriesUseCase;

  constructor(repo: SeriesRepository) {
    this.searchSeriesUseCase = new SearchSeriesUseCase(repo);
    this.addSeriesUseCase = new AddSeriesUseCase(repo);
  }

  async searchSeries(term: SearchSeriesSchema): Promise<Series[]> {
    return this.searchSeriesUseCase.execute(term);
  }

  async addSeries(series: AddSeriesSchema): Promise<Series> {
    return this.addSeriesUseCase.execute(series);
  }
}
