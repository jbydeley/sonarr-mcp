import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findEpisodesHandler, findEpisodesSchema } from '../find-episodes.js';

describe('find-episodes schema', () => {
  it('validates required fields', () => {
    const valid = findEpisodesSchema.safeParse({
      seriesId: 100,
    });
    expect(valid.success).toBe(true);
  });

  it('fails without required fields', () => {
    const invalid = findEpisodesSchema.safeParse({});
    expect(invalid.success).toBe(false);
  });
});

describe('find-episodes tool', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('calls Sonarr episode endpoint with minimal params', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/episode')
      .query({ seriesId: '100' })
      .reply(200, [
        {
          id: 1,
          seriesId: 100,
          seasonNumber: 2,
          episodeNumber: 3,
          title: 'Test Episode',
          airDate: '2020-01-01',
          overview: 'This is a test overview.',
        },
      ]);

    const data = findEpisodesSchema.parse({
      seriesId: 100,
    });
    const result = await findEpisodesHandler(data);
    expect((result.content?.[0] as { text: string }).text).toContain(
      'Test Episode',
    );
    expect(result.content?.[0]?.type).toBe('text');
  });

  it('calls Sonarr episode endpoint with all params', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/episode')
      .query({
        seriesId: '100',
        seasonNumber: '2',
        includeSeries: 'true',
        includeEpisodeFile: 'false',
        includeEpisodeImages: 'false',
        episodeFileId: '1',
      })
      .reply(200, [
        {
          id: 1,
          seriesId: 100,
          seasonNumber: 2,
          episodeNumber: 3,
          title: 'Test Episode',
          airDate: '2020-01-01',
          overview: 'This is a test overview.',
        },
      ]);

    const data = findEpisodesSchema.parse({
      seriesId: 100,
      seasonNumber: 2,
      includeSeries: true,
      includeEpisodeFile: false,
      includeEpisodeImages: false,
      episodeFileId: 1,
    });
    const result = await findEpisodesHandler(data);
    expect((result.content?.[0] as { text: string }).text).toContain(
      'Test Episode',
    );
    expect(result.content?.[0]?.type).toBe('text');
  });
});
