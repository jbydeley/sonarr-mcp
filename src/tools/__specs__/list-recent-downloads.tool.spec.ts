import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  listRecentDownloadsHandler,
  listRecentDownloadsSchema,
} from '../list-recent-downloads.js';

describe('list-recent-downloads schema', () => {
  it('validates required fields', () => {
    const valid = listRecentDownloadsSchema.safeParse({});
    expect(valid.success).toBe(true);
  });
});

describe('list-recent-downloads tool', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('calls Sonarr history endpoint and returns expected result', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/history')
      .query({
        page: '1',
        pageSize: '10',
        sortKey: 'date',
        sortDirection: 'default',
        includeSeries: 'false',
        includeEpisode: 'false',
      })
      .reply(200, {
        page: 1,
        pageSize: 10,
        records: [{ id: 1, eventType: 'Grabbed' }],
      });

    const data = listRecentDownloadsSchema.parse({});
    const result = await listRecentDownloadsHandler(data);
    expect((result.content?.[0] as { text: string }).text).toContain(
      'eventType',
    );
    expect(result.content?.[0]?.type).toBe('text');
  });
});
