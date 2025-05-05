import type { SeriesRepository } from "../ports/series.repository";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema";
import type { Series } from "../entities/series.entity";

export class AddSeriesUseCase {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async execute(input: AddSeriesSchema): Promise<Series> {
    return this.seriesRepository.addSeries(input);
  }
}
