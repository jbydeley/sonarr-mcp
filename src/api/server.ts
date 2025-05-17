import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const server = new McpServer({
  name: 'Sonarr',
  version: '1.0.0',
  capabilities: {
    tools: {},
    resources: {},
  },
});

const resourceDirs = readdirSync(join(__dirname, '../resources'));

for (const dir of resourceDirs) {
  const mod = await import(`../resources/${dir}/index.js`);
  if (mod.enabled) {
    server.resource(mod.resourceName, mod.resourceUri, mod.resourceHandler);
  }
}

const toolDirs = readdirSync(join(__dirname, '../tools'));
for (const dir of toolDirs) {
  const mod = await import(`../tools/${dir}/index.js`);
  if (mod.enabled) {
    server.tool(
      mod.toolName,
      mod.toolDescription,
      mod.toolSchema.shape,
      mod.toolHandler,
    );
  }
}
