import { describe, expect, it, vi } from 'vitest';
import { toolHandler, toolSchema } from './index.js';

vi.mock('@/common/sonarr.http-client.js', () => {
  return {
    SonarrHttpClient: vi.fn().mockImplementation(() => ({
      get: vi.fn().mockResolvedValue([
        {
          id: 1,
          seriesId: 100,
          seasonNumber: 2,
          episodeNumber: 3,
          title: 'Test Episode',
          airDate: '2020-01-01',
          overview: 'This is a test overview.',
        },
      ]),
    })),
  };
});

describe('find-episodes schema', () => {
  it('validates required fields', () => {
    const valid = toolSchema.safeParse({
      seriesId: 100,
    });
    expect(valid.success).toBe(true);
  });

  it('fails without required fields', () => {
    const invalid = toolSchema.safeParse({});
    expect(invalid.success).toBe(false);
  });

  it('applies default values', () => {
    const parsed = toolSchema.parse({
      seriesId: 100,
    });
    expect(parsed.includeSeries).toBe(false);
    expect(parsed.includeEpisodeFile).toBe(false);
    expect(parsed.includeEpisodeImages).toBe(false);
  });
});

describe('find-episodes tool', () => {
  it('calls SonarrHttpClient.get with minimal params and returns expected result', async () => {
    const data = toolSchema.parse({
      seriesId: 100,
    });
    const result = await toolHandler(data);
    expect(result.content?.[0]?.text).toContain('Test Episode');
    expect(result.content?.[0]?.type).toBe('text');
  });

  it('calls SonarrHttpClient.get with all params and returns expected result', async () => {
    const data = toolSchema.parse({
      seriesId: 100,
      seasonNumber: 2,
      includeSeries: true,
      includeEpisodeFile: false,
      includeEpisodeImages: false,
      episodeIds: [1],
      episodeFileId: 1,
    });
    const result = await toolHandler(data);
    expect(result.content?.[0]?.text).toContain('Test Episode');
    expect(result.content?.[0]?.type).toBe('text');
  });
});
