import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addSeriesSchema, addSeriesHandler } from "./tools/add-series.js";
import { findEpisodesHandler, findEpisodesSchema } from "./tools/find-episodes.js";
import { getLogsSchema, getLogsHandler } from "./tools/get-logs.js";
import { listRecentDownloadsSchema, listRecentDownloadsHandler } from "./tools/list-recent-downloads.js";
import { listUpcomingEpisodesSchema, listUpcomingEpisodesHandler } from "./tools/list-upcoming-episodes.js";
import { searchSeriesSchema, searchSeriesHandler } from "./tools/search-series.js";
import { episodeResourceHandler } from "./resources/episode.js";
import { seriesResourceHandler } from "./resources/series.js";
import { qualityDefinitionResourceHandler } from "./resources/quality-definition.js";
import { qualityProfilesResourceHandler } from "./resources/quality-profiles.js";

export const tools = [{
    name: 'add-series',
    description: 'Add series to Sonarr',
    schema: addSeriesSchema,
    handler: addSeriesHandler,
}, {
    name: 'find-episodes',
    description: 'Find episodes in Sonarr',
    schema: findEpisodesSchema,
    handler: findEpisodesHandler,
}, {
    name: 'get-logs',
    description: 'Get logs from Sonarr',
    schema: getLogsSchema,
    handler: getLogsHandler,
}, {
    name: 'list-recent-downloads',
    description: 'List recent downloads from Sonarr',
    schema: listRecentDownloadsSchema,
    handler: listRecentDownloadsHandler,
}, {
    name: 'list-upcoming-episodes',
    description: 'List upcoming episodes from Sonarr',
    schema: listUpcomingEpisodesSchema,
    handler: listUpcomingEpisodesHandler,
}, {
    name: 'search-series',
    description: 'Search for a TV series by term',
    schema: searchSeriesSchema,
    handler: searchSeriesHandler,
}];

export const resources = [{
    name: 'series',
    uri: new ResourceTemplate('sonarr://series/{id}', {
        list: undefined,
    }),
    handler: seriesResourceHandler,
}, {
    name: 'episode',
    uri: new ResourceTemplate('sonarr://episode/{id}', {
        list: undefined,
    }),
    handler: episodeResourceHandler,
}, {
    name: 'quality-profiles',
    uri: new ResourceTemplate('sonarr://quality-profiles', {
        list: undefined,
    }),
    handler: qualityProfilesResourceHandler,
}, {
    name: 'quality-definition',
    uri: new ResourceTemplate('sonarr://quality-definition', {
        list: undefined,
    }),
    handler: qualityDefinitionResourceHandler,
}];
