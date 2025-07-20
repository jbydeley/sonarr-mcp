import { beforeEach, describe, expect, it, vi } from 'vitest';
import { addSeriesHandler, addSeriesSchema } from '../add-series.js';

vi.mock('@/common/sonarr.http-client.js', () => {
  return {
    SonarrHttpClient: vi.fn().mockImplementation(() => ({
      post: vi.fn().mockResolvedValue({
        id: 123,
        title: 'Test Series',
        tvdbId: 999,
        qualityProfileId: 1,
        rootFolderPath: '/tv',
        monitored: true,
        seasonFolder: true,
        languageProfileId: 2,
        tags: [1, 2],
      }),
    })),
  };
});

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
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  it('calls SonarrHttpClient.post with correct data and returns expected result', async () => {
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
    expect(result.content?.[0]?.text).toContain('Test Series');
    expect(result.content?.[0]?.type).toBe('text');
  });
});
