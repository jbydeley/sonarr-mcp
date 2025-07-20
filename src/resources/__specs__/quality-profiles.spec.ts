import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {qualityProfilesResourceHandler} from '../quality-profiles.js';

describe('quality-profiles resource', () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('should export a quality-profiles resourceHandler and return mocked data', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/qualityProfile')
      .reply(200, [{ id: 1, name: 'HDTV-720p' }]);
    expect(typeof qualityProfilesResourceHandler).toBe('function');
    const result = await qualityProfilesResourceHandler(
      new URL('/api/v3/qualityProfile', 'http://localhost:8989'),
      {},
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.contents)).toBe(true);
    expect(result.contents?.[0]?.mimeType).toBe('application/json');
    expect(result.contents?.[0]?.text).toBe(
      JSON.stringify({ id: 1, name: 'HDTV-720p' }),
    );
  });
});
