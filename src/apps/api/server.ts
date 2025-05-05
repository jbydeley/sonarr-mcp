import { SearchSeriesTool } from "@/interfaces/mcp/search-series";
import { AddSeriesTool } from "@/interfaces/mcp/add-series";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SonarrRepository } from "@/infrastructure/http/sonarr-api/sonarr.repository.js";
import { SonarrHttpClient } from "@/infrastructure/http/sonarr-api/sonarr.http-client.js";
import { SeriesService } from "@/core/series/services/series.service";

export const server = new McpServer({
  name: "Sonarr",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
});

const sonarrHttpClient = new SonarrHttpClient();
const sonarrRepository = new SonarrRepository(sonarrHttpClient);
const seriesService = new SeriesService(sonarrRepository);
const searchSeriesTool = new SearchSeriesTool(seriesService);
const addSeriesTool = new AddSeriesTool(seriesService);
searchSeriesTool.register(server);
addSeriesTool.register(server);
