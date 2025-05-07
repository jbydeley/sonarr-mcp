import type { SeriesRepository } from "@/core/series/ports/series.repository.js";
import type { HttpClient } from "@/core/common/ports/http-client.interface.js";
import type { Series } from "@/core/series/entities/series.entity.js";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema.js";
import type { QualityRepository } from "@/core/quality/ports/quality.repository.js";
import type { QualityProfile } from "@/core/quality/entities/quality-profile.entity.js";
import { TvdbIdVo } from "@/core/series/value-objects/tvdb-id.vo.js";
import type { CalendarRepository } from "@/core/calendar/ports/calendar.repository.js";
import type { Episode } from "@/core/calendar/entities/episode.entity.js";
import type { ListUpcomingEpisodesSchema } from "@/interfaces/mcp/list-upcoming-episodes/list-upcoming-episodes.schema.js";
import type { DateRangeVO } from "@/core/calendar/value-objects/date-range.vo.js";

export class SonarrRepository
  implements SeriesRepository, QualityRepository, CalendarRepository
{
  constructor(private readonly httpClient: HttpClient) {}
  async listUpcomingEpisodes(
    input: Omit<ListUpcomingEpisodesSchema, "start" | "end"> & {
      dateRange: DateRangeVO;
    }
  ): Promise<Episode[]> {
    try {
      const params = Object.entries(input)
        .filter(([_, v]) => v !== undefined && v !== null)
        .reduce(
          (acc, [k, v]) => ({ ...acc, [k]: String(v) }),
          {} as Record<string, string>
        );

      params.start = input.dateRange.start.toISOString();
      params.end = input.dateRange.end.toISOString();

      const queryString = new URLSearchParams(
        params as Record<string, string>
      ).toString();
      const url = `/api/v3/calendar${queryString ? `?${queryString}` : ""}`;

      const episodes = await this.httpClient.get<Episode[]>(url);

      return episodes;
    } catch (error) {
      console.error("Error listing upcoming episodes:", error);
      throw error;
    }
  }

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
