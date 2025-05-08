import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ServerInterface, ToolRegistration } from "./types.js";
import { z } from "zod";

type Handler<T> = (input: T) => Promise<CallToolResult>;

export const registerTool = <T>(
  server: ServerInterface,
  registration: ToolRegistration<T>
) => {
  server.tool(
    registration.name,
    registration.description || "",
    registration.schema || {},
    (input: unknown) => {
      return registration.handler(input as T);
    }
  );
};
