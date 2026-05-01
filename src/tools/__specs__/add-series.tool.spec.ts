import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { addSeriesHandler, addSeriesSchema } from '../add-series.js';

describe('add-series schema', () => {
  it('validates required fields', () => {
    const valid = addSeriesSchema.safeParse({
      title: 'Test Series',
      tvdbId: 999,
    });
    expect(valid.success).toBe(true);
  });

  it('fails without required fields', () => {
    const invalid = addSeriesSchema.safeParse({});
    expect(invalid.success).toBe(false);
  });

  it('applies default values', () => {
    const parsed = addSeriesSchema.parse({
      title: 'Test Series',
      tvdbId: 999,
    });
    expect(parsed.qualityProfileId).toBe(1);
    expect(parsed.rootFolderPath).toBe('/tv');
    expect(parsed.monitored).toBe(true);
    expect(parsed.seasonFolder).toBe(true);
    expect(parsed.addOptions).toEqual({ searchForMissingEpisodes: true });
  });
});

describe('add-series tool', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('calls Sonarr POST and returns expected result', async () => {
    nock('http://localhost:8989')
      .post('/api/v3/series')
      .reply(200, {
        id: 123,
        title: 'Test Series',
        tvdbId: 999,
        qualityProfileId: 1,
        rootFolderPath: '/tv',
        monitored: true,
        seasonFolder: true,
        languageProfileId: 2,
        tags: [1, 2],
      });

    const data = {
      title: 'Test Series',
      tvdbId: 999,
      qualityProfileId: 1,
      rootFolderPath: '/tv',
      monitored: true,
      seasonFolder: true,
      languageProfileId: 2,
      tags: [1, 2],
      addOptions: { searchForMissingEpisodes: true },
    };
    const result = await addSeriesHandler(data);
    expect((result.content?.[0] as { text: string }).text).toContain(
      'Test Series',
    );
    expect(result.content?.[0]?.type).toBe('text');
  });
});
