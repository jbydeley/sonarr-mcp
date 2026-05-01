import { describe, expect, it } from 'vitest';
import { listUpcomingEpisodesSchema } from '../list-upcoming-episodes.js';

describe('list-upcoming-episodes schema', () => {
  it('rejects invalid ISO dates', () => {
    const invalid = listUpcomingEpisodesSchema.safeParse({
      start: 'not-a-date',
      end: '2025-01-01T00:00:00Z',
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects when start is after end', () => {
    const invalid = listUpcomingEpisodesSchema.safeParse({
      start: '2025-12-31T00:00:00Z',
      end: '2025-01-01T00:00:00Z',
    });
    expect(invalid.success).toBe(false);
  });

  it('accepts valid date range', () => {
    const valid = listUpcomingEpisodesSchema.safeParse({
      start: '2025-01-01T00:00:00Z',
      end: '2025-01-07T00:00:00Z',
    });
    expect(valid.success).toBe(true);
  });
});
