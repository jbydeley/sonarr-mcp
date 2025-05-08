import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTool } from "@/common/register-tool.js";
import { searchSeriesToolRegistration } from "@/features/series/search-series/search-series.const.js";
import { listQualityProfilesToolRegistration } from "@/features/quality/list-quality-profiles/list-quality-profiles.const.js";
import { listUpcomingEpisodesToolRegistration } from "@/features/episodes/list-upcoming-episodes/list-upcoming-episodes.const.js";
import { addSeriesToolRegistration } from "@/features/series/add-series/add-series.const.js";
import { getEpisodeToolRegistration } from "@/features/episodes/get-episode/get-episode.const.js";
import { getEpisodesToolRegistration } from "@/features/episodes/get-episodes/get-episodes.const.js";
import { listRecentDownloadsToolRegistration } from "@/features/history/list-recent-downloads/list-recent-downloads.const.js";
import { getLogsToolRegistration } from "@/features/log/get-logs/get-logs.const.js";

export const server = new McpServer({
  name: "Sonarr",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
});

registerTool(server, searchSeriesToolRegistration);
registerTool(server, listQualityProfilesToolRegistration);
registerTool(server, listUpcomingEpisodesToolRegistration);
registerTool(server, addSeriesToolRegistration);
registerTool(server, getEpisodeToolRegistration);
registerTool(server, getEpisodesToolRegistration);
registerTool(server, listRecentDownloadsToolRegistration);
registerTool(server, getLogsToolRegistration);
