import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "@/apps/api/server";

const transport = new StdioServerTransport();
await server.connect(transport);
