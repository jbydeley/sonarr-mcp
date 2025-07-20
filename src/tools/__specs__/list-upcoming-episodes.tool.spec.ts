import { describe, expect, it, vi } from 'vitest';
import { listUpcomingEpisodesHandler, listUpcomingEpisodesSchema } from '../list-upcoming-episodes.js';

vi.mock('@/common/sonarr.http-client.js', () => {
  return {
    SonarrHttpClient: vi.fn().mockImplementation(() => ({
      get: vi.fn().mockResolvedValue([
        {
          id: 1,
          seriesId: 10,
          seasonNumber: 2,
          episodeNumber: 3,
          title: 'Upcoming Episode',
          airDate: '2024-02-01',
          overview: 'Overview text',
        },
      ]),
    })),
  };
});

describe('list-upcoming-episodes schema', () => {
  it('validates required fields (none required)', () => {
    const valid = listUpcomingEpisodesSchema.safeParse({});
    expect(valid.success).toBe(true);
  });

  it('applies default values', () => {
    const parsed = listUpcomingEpisodesSchema.parse({});
    expect(parsed.unmonitored).toBe(false);
    expect(parsed.includeSeries).toBe(false);
    expect(parsed.includeEpisodeFile).toBe(false);
    expect(parsed.includeEpisodeImages).toBe(false);
  });
});

describe('list-upcoming-episodes tool', () => {
  it('calls SonarrHttpClient.get and returns expected result', async () => {
    const data = listUpcomingEpisodesSchema.parse({
      start: new Date(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      includeSeries: false,
      includeEpisodeFile: false,
      includeEpisodeImages: false,
      unmonitored: false,
    });
    const result = await listUpcomingEpisodesHandler(data);
    expect(result.content?.[0]?.text).toContain('Upcoming Episode');
    expect(result.content?.[0]?.type).toBe('text');
  });
});
