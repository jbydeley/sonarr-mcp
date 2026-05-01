import { env } from './env.js';

export class SonarrHttpClient {
  private readonly baseUrl = env.SONARR_URL;
  private readonly apiKey = env.SONARR_API_KEY;
  private readonly debug = env.SONARR_MCP_DEBUG;

  private get headers() {
    return { 'X-Api-Key': this.apiKey, 'Content-Type': 'application/json' };
  }

  async get<T = unknown>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const start = performance.now();
    const response = await fetch(url, {
      headers: this.headers,
      signal: AbortSignal.timeout(10000),
    });
    this.log('GET', path, response.status, start);
    return this.handleResponse<T>(response);
  }

  async post<T = unknown>(path: string, body: unknown): Promise<T> {
    const start = performance.now();
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });
    this.log('POST', path, response.status, start);
    return this.handleResponse<T>(response);
  }

  private log(method: string, path: string, status: number, start: number) {
    if (!this.debug) return;
    const duration = Math.round(performance.now() - start);
    const safePath = path.replace(/key=[^&]*/gi, 'key=***');
    process.stderr.write(`[sonarr-mcp] ${method} ${safePath} ${status} ${duration}ms\n`);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Sonarr HTTP ${response.status}: ${text}`);
    }
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(`Invalid JSON response from Sonarr: ${text}`);
    }
  }
}
