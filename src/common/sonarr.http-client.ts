import { env } from './env.js';

export class SonarrHttpClient {
  private readonly baseUrl = env.SONARR_URL;
  private readonly apiKey = env.SONARR_API_KEY;

  private get headers() {
    return { 'X-Api-Key': this.apiKey };
  }

  async get<T = unknown>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      headers: this.headers,
    });
    return response.json();
  }

  async post<T = unknown>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return response.json();
  }
}
