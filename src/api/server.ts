import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import pkg from '../../package.json' with { type: 'json' };
import { resources, resourceTemplates, tools } from '../registry.js';

export const server = new McpServer({
  name: 'Sonarr',
  version: pkg.version,
  capabilities: {
    tools: {},
    resources: {},
  },
});

for (const resource of resourceTemplates) {
  server.registerResource(
    resource.name,
    resource.uri,
    {
      title: resource.title,
      description: resource.description,
    },
    resource.handler,
  );
}

for (const resource of resources) {
  server.registerResource(
    resource.name,
    resource.uri,
    {
      title: resource.title,
      description: resource.description,
    },
    resource.handler,
  );
}

for (const tool of tools) {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.schema.shape,
    },
    tool.handler,
  );
}
