import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { SonarrHttpClient } from './sonarr.http-client.js';

export async function runSonarrTool<T>(
  fn: (client: SonarrHttpClient) => Promise<T>,
  formatter?: (result: T) => CallToolResult,
): Promise<CallToolResult> {
  const client = new SonarrHttpClient();
  try {
    const result = await fn(client);
    if (formatter) {
      return formatter(result);
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(result) }],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text', text: `Sonarr request failed: ${message}` }],
      isError: true,
    };
  }
}

export async function runSonarrResource<T>(
  fn: (client: SonarrHttpClient) => Promise<T>,
): Promise<T> {
  const client = new SonarrHttpClient();
  return fn(client);
}
