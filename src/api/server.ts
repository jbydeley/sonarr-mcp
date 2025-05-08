import {
  addSeriesToolDescription,
  addSeriesToolName,
  addSeriesSchema,
  addSeriesToolHandler,
} from "@/tools/add-series/index.js";
import {
  searchSeriesToolDescription,
  searchSeriesToolName,
  searchSeriesSchema,
  searchSeriesToolHandler,
} from "@/tools/search-series/index.js";
import {
  findEpisodesToolDescription,
  findEpisodesToolName,
  findEpisodesSchema,
  findEpisodesToolHandler,
} from "@/tools/find-episodes/index.js";
import {
  listUpcomingEpisodesToolDescription,
  listUpcomingEpisodesToolName,
  listUpcomingEpisodesSchema,
  listUpcomingEpisodesToolHandler,
} from "@/tools/list-upcoming-episodes/index.js";
import {
  listRecentDownloadsToolDescription,
  listRecentDownloadsToolName,
  listRecentDownloadsSchema,
  listRecentDownloadsToolHandler,
} from "@/tools/list-recent-downloads/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  getLogsToolHandler,
  getLogsToolName,
  getLogsToolDescription,
  getLogsSchema,
} from "@/tools/get-logs/index.js";
import {
  episodeResourceHandler,
  episodeResourceName,
  episodeResourceUriTemplate,
} from "@/resources/episode/index.js";
import {
  qualityProfilesResourceHandler,
  qualityProfilesResourceName,
  qualityProfilesResourceUri,
} from "@/resources/quality-profiles/index.js";
import {
  seriesResourceHandler,
  seriesResourceName,
  seriesResourceUriTemplate,
} from "@/resources/series/index.js";
import {
  qualityDefinitionResourceHandler,
  qualityDefinitionResourceName,
  qualityDefinitionResourceUri,
} from "@/resources/quality-definition/index.js";

export const server = new McpServer({
  name: "Sonarr",
  version: "1.0.0",
  capabilities: {
    tools: {
      addSeries: addSeriesToolName,
      findEpisodes: findEpisodesToolName,
      searchSeries: searchSeriesToolName,
      listUpcomingEpisodes: listUpcomingEpisodesToolName,
      listRecentDownloads: listRecentDownloadsToolName,
      getLogs: getLogsToolName,
    },
    resources: {
      episode: episodeResourceUriTemplate,
      qualityDefinition: qualityDefinitionResourceUri,
      qualityProfiles: qualityProfilesResourceUri,
      series: seriesResourceUriTemplate,
    },
  },
});

server.resource(
  episodeResourceName,
  episodeResourceUriTemplate,
  episodeResourceHandler
);

server.resource(
  qualityDefinitionResourceName,
  qualityDefinitionResourceUri,
  qualityDefinitionResourceHandler
);

server.resource(
  qualityProfilesResourceName,
  qualityProfilesResourceUri,
  qualityProfilesResourceHandler
);

server.resource(
  seriesResourceName,
  seriesResourceUriTemplate,
  seriesResourceHandler
);

server.tool(
  addSeriesToolName,
  addSeriesToolDescription,
  addSeriesSchema.shape,
  addSeriesToolHandler
);

server.tool(
  findEpisodesToolName,
  findEpisodesToolDescription,
  findEpisodesSchema.shape,
  findEpisodesToolHandler
);

server.tool(
  searchSeriesToolName,
  searchSeriesToolDescription,
  searchSeriesSchema.shape,
  searchSeriesToolHandler
);

server.tool(
  listUpcomingEpisodesToolName,
  listUpcomingEpisodesToolDescription,
  listUpcomingEpisodesSchema.shape,
  listUpcomingEpisodesToolHandler
);

server.tool(
  listRecentDownloadsToolName,
  listRecentDownloadsToolDescription,
  listRecentDownloadsSchema.shape,
  listRecentDownloadsToolHandler
);

server.tool(
  getLogsToolName,
  getLogsToolDescription,
  getLogsSchema.shape,
  getLogsToolHandler
);
