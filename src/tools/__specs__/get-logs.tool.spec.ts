import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getLogsHandler, getLogsSchema } from '../get-logs.js';

describe('get-logs schema', () => {
  it('validates required fields', () => {
    const valid = getLogsSchema.safeParse({});
    expect(valid.success).toBe(true);
  });

  it('rejects non-positive page numbers', () => {
    const invalid = getLogsSchema.safeParse({ page: 0 });
    expect(invalid.success).toBe(false);
  });

  it('rejects page size over 250', () => {
    const invalid = getLogsSchema.safeParse({ pageSize: 500 });
    expect(invalid.success).toBe(false);
  });

  it('rejects non-integer page size', () => {
    const invalid = getLogsSchema.safeParse({ pageSize: 10.5 });
    expect(invalid.success).toBe(false);
  });

  it('accepts valid pagination', () => {
    const valid = getLogsSchema.safeParse({ page: 2, pageSize: 50 });
    expect(valid.success).toBe(true);
  });
});

describe('get-logs tool', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error('Not all nock interceptors were used!');
    }
  });

  it('calls Sonarr log endpoint and returns expected result', async () => {
    nock('http://localhost:8989')
      .get('/api/v3/log')
      .query({
        page: '1',
        pageSize: '10',
        sortKey: 'date',
        sortDirection: 'default',
        level: 'info',
      })
      .reply(200, {
        page: 1,
        pageSize: 10,
        records: [{ id: 1, message: 'Test log entry' }],
      });

    const data = getLogsSchema.parse({});
    const result = await getLogsHandler(data);
    expect((result.content?.[0] as { text: string }).text).toContain(
      'Test log entry',
    );
    expect(result.content?.[0]?.type).toBe('text');
  });
});
