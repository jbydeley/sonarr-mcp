import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { listUpcomingEpisodesHandler, listUpcomingEpisodesSchema } from '../list-upcoming-episodes.js';

describe('list-upcoming-episodes schema', () => {
  it('validates required fields', () => {
    const valid = listUpcomingEpisodesSchema.safeParse({});
    expect(valid.success).toBe(true);
  });

  it('rejects invalid ISO dates', () => {
    const invalid = listUpcomingEpisodesSchema.safeParse({
      start: 'not-a-date',
      end: '2025-01-01T00:00:00Z',
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects when start is after end', () => {
    const invalid = listUpcomingEpisodesSchema.safeParse({
      start: '2025-12-31T00:00:00Z',
      end: '2025-01-01T00:00:00Z',
    });
    expect(invalid.success).toBe(false);
  });

  it('accepts valid date range', () => {
    const valid = listUpcomingEpisodesSchema.safeParse({
      start: '2025-01-01T00:00:00Z',
      end: '2025-01-07T00:00:00Z',
    });
    expect(valid.success).toBe(true);
  });
});

describe('list-upcoming-episodes tool', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('calls Sonarr calendar endpoint and returns expected result', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/calendar')
      .query(() => true)
      .reply(200, [
        {
          id: 1,
          seriesId: 100,
          seasonNumber: 1,
          episodeNumber: 1,
          title: 'Upcoming Episode',
          airDate: '2025-01-01',
        },
      ]);

    const data = listUpcomingEpisodesSchema.parse({});
    const result = await listUpcomingEpisodesHandler(data);
    expect((result.content?.[0] as { text: string })?.text).toContain(
      'Upcoming Episode',
    );
    expect(result.content?.[0]?.type).toBe('text');
  });
});
