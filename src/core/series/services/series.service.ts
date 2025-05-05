import type { SeriesRepository } from "../ports/series.repository.js";
import type { Series } from "../entities/series.entity.js";
import type { SearchSeriesSchema } from "@/interfaces/mcp/search-series/search-series.schema.js";
import { SearchSeriesUseCase } from "../use-cases/search-series.usecase.js";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema.js";
import { AddSeriesUseCase } from "../use-cases/add-series.usecase.js";
import { TvdbIdVo } from "../value-objects/tvdb-id.vo.js";

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

  async addSeries(id: TvdbIdVo, series: AddSeriesSchema): Promise<Series> {
    return this.addSeriesUseCase.execute(id, series);
  }
}
