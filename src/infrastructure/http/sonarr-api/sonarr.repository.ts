import type { SeriesRepository } from "@/core/series/ports/series.repository";
import type { HttpClient } from "@/core/series/ports/http-client.interface";
import type { Series } from "@/core/series/entities/series.entity";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema";

export class SonarrRepository implements SeriesRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async searchSeries(term: string): Promise<Series[]> {
    try {
      const series = await this.httpClient.get<Series[]>(
        `/api/v3/series/lookup?term=${term}`
      );

      return series;
    } catch (error) {
      console.error("Error searching for series:", error);
      throw error;
    }
  }

  async addSeries(input: AddSeriesSchema): Promise<Series> {
    try {
      const series = await this.httpClient.post<Series>(
        `/api/v3/series`,
        input
      );

      return series;
    } catch (error) {
      console.error("Error adding series:", error);
      throw error;
    }
  }
}
