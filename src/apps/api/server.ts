import { SearchSeriesTool } from "@/interfaces/mcp/search-series/search-series.tool.js";
import { AddSeriesTool } from "@/interfaces/mcp/add-series/add-series.tool.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SonarrRepository } from "@/infrastructure/http/sonarr-api/sonarr.repository.js";
import { SonarrHttpClient } from "@/infrastructure/http/sonarr-api/sonarr.http-client.js";
import { SeriesService } from "@/core/series/services/series.service.js";
import { ListQualitiesTool } from "@/interfaces/mcp/list-qualities/list-qualities.tool.js";
import { QualityService } from "@/core/quality/services/quality.service.js";

export const server = new McpServer({
  name: "Sonarr",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
});

const sonarrHttpClient = new SonarrHttpClient();
const sonarrRepository = new SonarrRepository(sonarrHttpClient);

// Series Tools
const seriesService = new SeriesService(sonarrRepository);
const searchSeriesTool = new SearchSeriesTool(seriesService);
const addSeriesTool = new AddSeriesTool(seriesService);
searchSeriesTool.register(server);
addSeriesTool.register(server);

// Quality Tools
const qualityService = new QualityService(sonarrRepository);
const listQualitiesTool = new ListQualitiesTool(qualityService);
listQualitiesTool.register(server);
