import type { SeriesRepository } from "@/core/series/ports/series.repository.js";
import type { HttpClient } from "@/core/common/ports/http-client.interface.js";
import type { Series } from "@/core/series/entities/series.entity.js";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema.js";
import type { QualityRepository } from "@/core/quality/ports/quality.repository.js";
import type { QualityProfile } from "@/core/quality/entities/quality-profile.entity.js";
import { TvdbIdVo } from "@/core/series/value-objects/tvdb-id.vo.js";

export class SonarrRepository implements SeriesRepository, QualityRepository {
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

  async addSeries(id: TvdbIdVo, data: AddSeriesSchema): Promise<Series> {
    try {
      const series = await this.httpClient.post<Series>(`/api/v3/series`, {
        data,
        tvdbid: id.raw,
      });

      return series;
    } catch (error) {
      console.error("Error adding series:", error);
      throw error;
    }
  }

  async getQualityProfiles(): Promise<QualityProfile[]> {
    try {
      const qualityProfiles = await this.httpClient.get<QualityProfile[]>(
        `/api/v3/qualityprofile`
      );

      return qualityProfiles;
    } catch (error) {
      console.error("Error getting quality profiles:", error);
      throw error;
    }
  }
}
