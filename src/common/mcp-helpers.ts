import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';
import { env } from './env.js';

function createClient() {
  return new SonarrHttpClient({
    baseUrl: env.SONARR_URL,
    apiKey: env.SONARR_API_KEY,
    debug: env.SONARR_MCP_DEBUG,
  });
}

export async function runSonarrTool<T>(
  fn: (client: SonarrHttpClient) => Promise<T>,
  formatter?: (result: T) => CallToolResult,
): Promise<CallToolResult> {
  const client = createClient();
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
  const client = createClient();
  return fn(client);
}
