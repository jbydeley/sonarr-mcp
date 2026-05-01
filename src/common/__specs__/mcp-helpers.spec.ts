import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { runSonarrTool } from '../mcp-helpers.js';

describe('runSonarrTool', () => {
  const baseUrl = 'http://localhost:8989';

  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('returns successful result as JSON text', async () => {
    nock(baseUrl).get('/api/v3/test').reply(200, { ok: true });

    const result = await runSonarrTool((client) => client.get('/api/v3/test'));
    expect(result.isError).toBeFalsy();
    expect((result.content?.[0] as { text: string }).text).toBe(
      JSON.stringify({ ok: true }),
    );
  });

  it('returns custom formatter result when provided', async () => {
    nock(baseUrl).get('/api/v3/test').reply(200, ['a', 'b']);

    const result = await runSonarrTool(
      (client) => client.get<string[]>('/api/v3/test'),
      (items) => ({
        content: items.map((item) => ({ type: 'text' as const, text: item })),
      }),
    );
    expect(result.isError).toBeFalsy();
    expect(result.content).toHaveLength(2);
  });

  it('returns isError true on HTTP failure', async () => {
    nock(baseUrl).get('/api/v3/test').reply(500, 'Server Error');

    const result = await runSonarrTool((client) => client.get('/api/v3/test'));
    expect(result.isError).toBe(true);
    expect((result.content?.[0] as { text: string }).text).toContain(
      'Sonarr request failed: Sonarr HTTP 500: Server Error',
    );
  });
});
