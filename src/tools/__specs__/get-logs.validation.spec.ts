import { describe, expect, it } from 'vitest';
import { getLogsSchema } from '../get-logs.js';

describe('get-logs schema', () => {
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
