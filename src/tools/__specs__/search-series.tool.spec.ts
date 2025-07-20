import { describe, expect, it, vi } from 'vitest';
import { searchSeriesHandler, searchSeriesSchema } from '../search-series.js';

vi.mock('@/common/sonarr.http-client.js', () => {
  return {
    SonarrHttpClient: vi.fn().mockImplementation(() => ({
      get: vi.fn().mockResolvedValue([
        {
          id: 1,
          title: 'Test Series',
          tvdbId: 999,
          year: 2020,
        },
      ]),
    })),
  };
});

describe('search-series schema', () => {
  it('validates required fields', () => {
    const valid = searchSeriesSchema.safeParse({ term: 'foo' });
    expect(valid.success).toBe(true);
  });
});

describe('search-series tool', () => {
  it('calls SonarrHttpClient.get and returns expected result', async () => {
    const data = searchSeriesSchema.parse({ term: 'Test Series' });
    const result = await searchSeriesHandler(data);
    expect(result.content?.[0]?.text).toContain('Test Series');
    expect(result.content?.[0]?.type).toBe('text');
  });
});
