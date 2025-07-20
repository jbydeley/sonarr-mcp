import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { episodeResourceHandler } from './resources/episode.js';
import { qualityDefinitionResourceHandler } from './resources/quality-definition.js';
import { qualityProfilesResourceHandler } from './resources/quality-profiles.js';
import { seriesResourceHandler } from './resources/series.js';
import { addSeriesHandler, addSeriesSchema } from './tools/add-series.js';
import {
  findEpisodesHandler,
  findEpisodesSchema,
} from './tools/find-episodes.js';
import { getLogsHandler, getLogsSchema } from './tools/get-logs.js';
import {
  listRecentDownloadsHandler,
  listRecentDownloadsSchema,
} from './tools/list-recent-downloads.js';
import {
  listUpcomingEpisodesHandler,
  listUpcomingEpisodesSchema,
} from './tools/list-upcoming-episodes.js';
import {
  searchSeriesHandler,
  searchSeriesSchema,
} from './tools/search-series.js';

export const tools = [
  {
    name: 'add-series',
    title: 'Add Series',
    description: 'Add series to Sonarr',
    schema: addSeriesSchema,
    handler: addSeriesHandler,
  },
  {
    name: 'find-episodes',
    title: 'Find Episodes',
    description: 'Find episodes in Sonarr',
    schema: findEpisodesSchema,
    handler: findEpisodesHandler,
  },
  {
    name: 'get-logs',
    title: 'Get Logs',
    description: 'Get logs from Sonarr',
    schema: getLogsSchema,
    handler: getLogsHandler,
  },
  {
    name: 'list-recent-downloads',
    title: 'List Recent Downloads',
    description: 'List recent downloads from Sonarr',
    schema: listRecentDownloadsSchema,
    handler: listRecentDownloadsHandler,
  },
  {
    name: 'list-upcoming-episodes',
    title: 'List Upcoming Episodes',
    description: 'List upcoming episodes from Sonarr',
    schema: listUpcomingEpisodesSchema,
    handler: listUpcomingEpisodesHandler,
  },
  {
    name: 'search-series',
    title: 'Search Series',
    description: 'Search for a TV series by term',
    schema: searchSeriesSchema,
    handler: searchSeriesHandler,
  },
];

export const resourceTemplates = [
  {
    name: 'series',
    title: 'Series',
    description: 'List Series',
    uri: new ResourceTemplate('sonarr://series/{id}', {
      list: undefined,
    }),
    handler: seriesResourceHandler,
  },
  {
    name: 'episode',
    title: 'Episode',
    description: 'Get Episode',
    uri: new ResourceTemplate('sonarr://episode/{id}', {
      list: undefined,
    }),
    handler: episodeResourceHandler,
  },
];

export const resources = [
  {
    name: 'quality-profiles',
    title: 'Quality Profiles',
    description: 'List Quality Profiles',
    uri: 'sonarr://quality-profile',
    handler: qualityProfilesResourceHandler,
  },
  {
    name: 'quality-definitions',
    title: 'Quality Definitions',
    description: 'List Quality Definitions',
    uri: 'sonarr://quality-definition',
    handler: qualityDefinitionResourceHandler,
  },
];
