import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { searchSeriesHandler, searchSeriesSchema } from '../search-series.js';

describe('search-series schema', () => {
  it('validates required fields', () => {
    const valid = searchSeriesSchema.safeParse({ term: 'foo' });
    expect(valid.success).toBe(true);
  });

  it('accepts terms with special characters', () => {
    const valid = searchSeriesSchema.safeParse({ term: 'The Office & More?' });
    expect(valid.success).toBe(true);
  });
});

describe('search-series tool', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('calls Sonarr lookup and returns expected result', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/series/lookup')
      .query({ term: 'Test Series' })
      .reply(200, [
        {
          id: 1,
          title: 'Test Series',
          tvdbId: 999,
          year: 2020,
        },
      ]);

    const data = searchSeriesSchema.parse({ term: 'Test Series' });
    const result = await searchSeriesHandler(data);
    expect((result.content?.[0] as { text: string }).text).toContain(
      'Test Series',
    );
    expect(result.content?.[0]?.type).toBe('text');
  });
});
