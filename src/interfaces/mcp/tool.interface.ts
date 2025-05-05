import type { ServerInterface } from "./server.interface.js";

export interface ToolInterface {
  register(server: ServerInterface): void;
}
