# Sonarr MCP Server

This is a [Model Context Protocol](https://modelcontextprotocol.org) (MCP) server for accessing Sonarr. It provides a set of tools for interacting with Sonarr programmatically.

## Available Tools

The following tools are available:

- `searchSeries`: Search for series in Sonarr
- `addSeries`: Add a series to Sonarr
- `listQualityProfiles`: List quality profiles in Sonarr
- `listUpcomingEpisodes`: List upcoming episodes in Sonarr
- `listRecentDownloads`: List recent downloads in Sonarr
- `getLogs`: Get logs from Sonarr

## Usage

To add this server to your MCP config, add the following:

```json
{
  "mcpServers": {
    "sonarr": {
      "command": "npx",
      "args": ["-y", "sonarr-mcp"],
      "env": {
        "SONARR_URL": "http://localhost:8989",
        "SONARR_API_KEY": "<your-sonarr-api-key>"
      }
    }
  }
}
```

You can get your sonarr api key from the sonarr web ui under Settings > API > API Key.
