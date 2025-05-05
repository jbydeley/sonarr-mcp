import type { SeriesRepository } from "../ports/series.repository.js";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema.js";
import type { Series } from "../entities/series.entity.js";
import { TvdbIdVo } from "../value-objects/tvdb-id.vo.js";

export class AddSeriesUseCase {
  constructor(
    private readonly seriesRepository: Pick<SeriesRepository, "addSeries">
  ) {}

  async execute(id: TvdbIdVo, input: AddSeriesSchema): Promise<Series> {
    return this.seriesRepository.addSeries(id, input);
  }
}
