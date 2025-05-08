import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export type ToolFnType = McpServer["tool"];

export interface ServerInterface {
  tool: ToolFnType;
}

export type ToolArgs = Parameters<ServerInterface["tool"]>;

type Handler<T> = (input: T) => Promise<CallToolResult>;

export interface ToolRegistration<T> {
  name: string;
  handler: Handler<T>;
  description?: string;
  schema?: z.ZodRawShape;
}
