import type { Episode } from './entities/episode.entity.js';
import type { HistoryRecord } from './entities/history-record.entity.js';
import type { LogsResponse } from './entities/log.entity.js';
import type { QualityDefinition } from './entities/quality-definition.entity.js';
import type { QualityProfile } from './entities/quality-profile.entity.js';
import type { Series } from './entities/series.entity.js';
import type { SonarrHttpClient } from './sonarr.http-client.js';
import { toUrlParams } from './to-url-params.js';

export class SonarrGateway {
  constructor(private readonly client: SonarrHttpClient) {}

  async searchSeries(term: string): Promise<Series[]> {
    const params = new URLSearchParams({ term });
    return this.client.get<Series[]>(
      `/api/v3/series/lookup?${params.toString()}`,
    );
  }

  async addSeries(body: unknown): Promise<Series> {
    return this.client.post<Series>('/api/v3/series', body);
  }

  async findEpisodes(query: Record<string, unknown>): Promise<Episode[]> {
    const params = toUrlParams(query);
    return this.client.get<Episode[]>(`/api/v3/episode?${params.toString()}`);
  }

  async getLogs(query: Record<string, unknown>): Promise<LogsResponse> {
    const params = toUrlParams(query);
    return this.client.get<LogsResponse>(`/api/v3/log?${params.toString()}`);
  }

  async listRecentDownloads(
    query: Record<string, unknown>,
  ): Promise<HistoryRecord[]> {
    const params = toUrlParams(query);
    return this.client.get<HistoryRecord[]>(
      `/api/v3/history?${params.toString()}`,
    );
  }

  async listUpcomingEpisodes(
    query: Record<string, unknown>,
  ): Promise<Episode[]> {
    const params = toUrlParams(query);
    if (typeof query.start === 'string') {
      params.set('start', new Date(query.start).toISOString());
    }
    if (typeof query.end === 'string') {
      params.set('end', new Date(query.end).toISOString());
    }
    return this.client.get<Episode[]>(`/api/v3/calendar?${params.toString()}`);
  }

  async getSeries(id: string): Promise<Series> {
    return this.client.get<Series>(`/api/v3/series/${id}`);
  }

  async getEpisode(id: string): Promise<Episode> {
    return this.client.get<Episode>(`/api/v3/episode/${id}`);
  }

  async getQualityProfiles(): Promise<QualityProfile[]> {
    return this.client.get<QualityProfile[]>('/api/v3/qualityProfile');
  }

  async getQualityDefinitions(): Promise<QualityDefinition[]> {
    return this.client.get<QualityDefinition[]>('/api/v3/qualityDefinition');
  }
}
