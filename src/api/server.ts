import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { tools, resources } from '../registry.js';
import pkg from '../../package.json' with { type: 'json' };

export const server = new McpServer({
  name: 'Sonarr',
  version: pkg.version,
  capabilities: {
    tools: {},
    resources: {},
  },
});

for (const resource of resources) {
  server.resource(resource.name, resource.uri, resource.handler);
}

for (const tool of tools) {
  server.tool(
    tool.name,
    tool.description,
    tool.schema.shape,
    tool.handler,
  );
}
