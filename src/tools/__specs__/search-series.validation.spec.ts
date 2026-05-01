import { describe, expect, it } from 'vitest';
import { searchSeriesSchema } from '../search-series.js';

describe('search-series schema', () => {
  it('validates required fields', () => {
    const valid = searchSeriesSchema.safeParse({ term: 'foo' });
    expect(valid.success).toBe(true);
  });

  it('accepts terms with special characters', () => {
    const valid = searchSeriesSchema.safeParse({ term: 'The Office & More?' });
    expect(valid.success).toBe(true);
  });
});
