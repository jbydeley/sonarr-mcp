# Sonarr MCP Server

This is a [Model Context Protocol](https://modelcontextprotocol.org) (MCP) server for accessing Sonarr. It provides a set of tools for interacting with Sonarr programmatically.

## Prerequisites

- Node.js >= 20
- A running Sonarr instance (v3 or v4)
- Your Sonarr API key (found in Sonarr UI under Settings > General > API Key)

## Tools

The following tools are available:

| Tool | Description | Read-only |
|------|-------------|-----------|
| `search-series` | Search for a TV series by term | Yes |
| `find-episodes` | Find episodes for a series | Yes |
| `get-logs` | Get paginated logs from Sonarr | Yes |
| `list-recent-downloads` | List recent download history | Yes |
| `list-upcoming-episodes` | List upcoming episodes from the calendar | Yes |
| `add-series` | Add a series to Sonarr | No |

### Example tool calls

**Search for a series:**
```json
{ "term": "Severance" }
```

**Find episodes:**
```json
{ "seriesId": 123, "seasonNumber": 1 }
```

**Add a series:**
```json
{
  "title": "Severance",
  "tvdbId": 371980,
  "qualityProfileId": 1,
  "rootFolderPath": "/tv"
}
```

## Resources

The following resources are available:

- `sonarr://series/{id}` - Retrieve information about a specific series by ID
- `sonarr://episode/{id}` - Retrieve information about a specific episode by ID
- `sonarr://quality-profile` - List quality profiles configured in Sonarr
- `sonarr://quality-definition` - List quality definitions used by Sonarr

## Configuration

Create a `.env` file or set environment variables:

```bash
SONARR_URL=http://localhost:8989
SONARR_API_KEY=your-api-key-here
```

## Usage

### With Claude Desktop / MCP Clients

Add this server to your MCP config:

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

### Local Development

```bash
npm install
npm run build
npm run test
npm run lint
```

Run locally with stdio transport:
```bash
SONARR_URL=http://localhost:8989 SONARR_API_KEY=xxx npm start
```

## Security

- Keep your `SONARR_API_KEY` private. Treat it like a password.
- Do not commit `.env` files containing your API key.
- The server communicates with Sonarr over HTTP(S). Use HTTPS when exposing Sonarr externally.

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|--------------|----------|
| "fetch failed" or connection errors | Wrong `SONARR_URL` | Verify the URL and that Sonarr is running |
| "Sonarr HTTP 401" | Invalid API key | Check your API key in Sonarr settings |
| "Invalid environment variables" | Missing required env vars | Set both `SONARR_URL` and `SONARR_API_KEY` |
