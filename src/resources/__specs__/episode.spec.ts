import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { episodeResourceHandler } from '../episode.js';

describe('episode resource', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('should export a resourceHandler and return mocked data', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/episode/1')
      .reply(200, { id: 1, title: 'Test Episode' });
    expect(typeof episodeResourceHandler).toBe('function');
    const result = await episodeResourceHandler(
      new URL('/api/v3/episode/1', 'http://localhost:8989'),
      { id: '1' },
      {},
    );
    expect(result).toBeDefined();
    expect(result.contents?.[0]?.mimeType).toBe('application/json');
    expect(result.contents?.[0]?.text).toBe(
      JSON.stringify({ id: 1, title: 'Test Episode' }),
    );
  });
});
