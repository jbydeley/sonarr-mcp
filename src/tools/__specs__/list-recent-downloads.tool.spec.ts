import { describe, expect, it, vi } from 'vitest';
import { listRecentDownloadsHandler, listRecentDownloadsSchema } from '../list-recent-downloads.js';

vi.mock('@/common/sonarr.http-client.js', () => {
  return {
    SonarrHttpClient: vi.fn().mockImplementation(() => ({
      get: vi.fn().mockResolvedValue([
        {
          id: 1,
          eventType: 1,
          seriesId: 2,
          episodeId: 3,
          date: '2024-01-01T00:00:00Z',
          data: {},
        },
      ]),
    })),
  };
});

describe('list-recent-downloads schema', () => {
  it('validates required fields (none required)', () => {
    const valid = listRecentDownloadsSchema.safeParse({});
    expect(valid.success).toBe(true);
  });

  it('applies default values', () => {
    const parsed = listRecentDownloadsSchema.parse({});
    expect(parsed.page).toBe(1);
    expect(parsed.pageSize).toBe(10);
    expect(parsed.sortKey).toBe('date');
    expect(parsed.sortDirection).toBe('default');
    expect(parsed.includeSeries).toBe(false);
    expect(parsed.includeEpisode).toBe(false);
  });
});

describe('list-recent-downloads tool', () => {
  it('calls SonarrHttpClient.get and returns expected result', async () => {
    const data = listRecentDownloadsSchema.parse({
      page: 1,
      pageSize: 10,
      sortKey: 'date',
      sortDirection: 'default',
      includeSeries: false,
      includeEpisode: false,
      eventType: ['Grabbed'],
      seriesIds: [1],
      quality: [1],
    });
    const result = await listRecentDownloadsHandler(data);
    expect(result.content?.[0]?.text).toContain('eventType');
    expect(result.content?.[0]?.type).toBe('text');
  });
});
