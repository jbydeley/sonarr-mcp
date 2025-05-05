import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type ToolFnType = McpServer["tool"];

export interface ServerInterface {
  tool: ToolFnType;
}
