import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import * as qualityProfilesResource from './index.js';

describe('quality-profiles resource', () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });
  it('should export a resourceUri', () => {
    expect(qualityProfilesResource.resourceUri).toBeDefined();
    expect(typeof qualityProfilesResource.resourceUri).toBe('string');
  });

  it('should export a quality-profiles resourceHandler and return mocked data', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/qualityProfile')
      .reply(200, [{ id: 1, name: 'HDTV-720p' }]);
    expect(typeof qualityProfilesResource.resourceHandler).toBe('function');
    const result = await qualityProfilesResource.resourceHandler(
      new URL(qualityProfilesResource.resourceUri),
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
