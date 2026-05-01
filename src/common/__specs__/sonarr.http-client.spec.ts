import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SonarrHttpClient } from '../sonarr.http-client.js';

describe('SonarrHttpClient', () => {
  const baseUrl = 'http://localhost:8989';

  function createClient() {
    return new SonarrHttpClient({
      baseUrl,
      apiKey: 'test-api-key',
      debug: false,
    });
  }

  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  describe('get', () => {
    it('returns parsed JSON on success', async () => {
      nock(baseUrl).get('/api/v3/series').reply(200, { id: 1, title: 'Test' });

      const client = createClient();
      const result = await client.get('/api/v3/series');
      expect(result).toEqual({ id: 1, title: 'Test' });
    });

    it('throws on 4xx with response body', async () => {
      nock(baseUrl).get('/api/v3/series').reply(400, 'Bad Request');

      const client = createClient();
      await expect(client.get('/api/v3/series')).rejects.toThrow(
        'Sonarr HTTP 400: Bad Request',
      );
    });

    it('throws on 5xx with response body', async () => {
      nock(baseUrl).get('/api/v3/series').reply(500, 'Internal Server Error');

      const client = createClient();
      await expect(client.get('/api/v3/series')).rejects.toThrow(
        'Sonarr HTTP 500: Internal Server Error',
      );
    });

    it('throws on invalid JSON response', async () => {
      nock(baseUrl).get('/api/v3/series').reply(200, 'not json');

      const client = createClient();
      await expect(client.get('/api/v3/series')).rejects.toThrow(
        'Invalid JSON response from Sonarr: not json',
      );
    });
  });

  describe('post', () => {
    it('returns parsed JSON on success', async () => {
      nock(baseUrl)
        .post('/api/v3/series', { title: 'Test' })
        .reply(200, { id: 1 });

      const client = createClient();
      const result = await client.post('/api/v3/series', { title: 'Test' });
      expect(result).toEqual({ id: 1 });
    });

    it('throws on non-2xx status', async () => {
      nock(baseUrl).post('/api/v3/series').reply(409, 'Conflict');

      const client = createClient();
      await expect(client.post('/api/v3/series', {})).rejects.toThrow(
        'Sonarr HTTP 409: Conflict',
      );
    });
  });
});
