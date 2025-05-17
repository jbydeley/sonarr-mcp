import axios from 'axios';
import { env } from './env.js';

export class SonarrHttpClient {
  private readonly baseUrl = env.SONARR_URL;
  private readonly apiKey = env.SONARR_API_KEY;

  private get headers() {
    return { 'X-Api-Key': this.apiKey };
  }

  async get<T = unknown>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.get(url, {
      headers: this.headers,
    });
    return response.data;
  }

  async post<T = unknown>(path: string, body: unknown): Promise<T> {
    const response = await axios.post(`${this.baseUrl}${path}`, body, {
      headers: this.headers,
    });
    return response.data;
  }
}
