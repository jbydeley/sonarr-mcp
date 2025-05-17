import { describe, expect, it, vi } from 'vitest';
import { type GetLogsDto, toolHandler, toolSchema } from './index.js';

vi.mock('@/common/sonarr.http-client.js', () => {
  return {
    SonarrHttpClient: vi.fn().mockImplementation(() => ({
      get: vi.fn().mockResolvedValue({
        page: 1,
        pageSize: 10,
        total: 1,
        records: [
          {
            id: 1,
            message: 'Test log entry',
            level: 'info',
            time: '2024-01-01T00:00:00Z',
          },
        ],
      }),
    })),
  };
});

describe('get-logs schema', () => {
  it('validates required fields', () => {
    const valid = toolSchema.safeParse({});
    expect(valid.success).toBe(true);
  });

  it('applies default values', () => {
    const parsed = toolSchema.parse({});
    expect(parsed.page).toBe(1);
    expect(parsed.pageSize).toBe(10);
    expect(parsed.sortKey).toBe('date');
    expect(parsed.sortDirection).toBe('default');
    expect(parsed.level).toBe('info');
  });
});

describe('get-logs tool', () => {
  it('calls SonarrHttpClient.get and returns expected result', async () => {
    const data: GetLogsDto = {
      page: 1,
      pageSize: 10,
      sortKey: 'date',
      sortDirection: 'default',
      level: 'info',
    };
    const result = await toolHandler(data);
    expect(result.content?.[0]?.text).toContain('Test log entry');
    expect(result.content?.[0]?.type).toBe('text');
  });
});
