import { describe, expect, it, vi } from 'vitest';
import { type SearchSeriesDto, toolHandler, toolSchema } from './index.js';

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
    const valid = toolSchema.safeParse({ term: 'foo' });
    expect(valid.success).toBe(true);
  });
});

describe('search-series tool', () => {
  it('calls SonarrHttpClient.get and returns expected result', async () => {
    const data: SearchSeriesDto = { term: 'Test Series' };
    const result = await toolHandler(data);
    expect(result.content?.[0]?.text).toContain('Test Series');
    expect(result.content?.[0]?.type).toBe('text');
  });
});
