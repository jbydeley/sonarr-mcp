import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {seriesResourceHandler} from '../series.js';

describe('series resource', () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('should export a series resourceHandler and return mocked data', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/series/1')
      .reply(200, { id: 1, title: 'Test Series' });
    expect(typeof seriesResourceHandler).toBe('function');
    const result = await seriesResourceHandler(
      new URL('/api/v3/series/1', 'http://localhost:8989'),
      { id: '1' },
      {},
    );
    expect(result).toBeDefined();
    expect(result.contents?.[0]?.mimeType).toBe('application/json');
    expect(result.contents?.[0]?.text).toBe(
      JSON.stringify({ id: 1, title: 'Test Series' }),
    );
  });
});
