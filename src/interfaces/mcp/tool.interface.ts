import type { ServerInterface } from "./server.interface";

export interface ToolInterface {
  register(server: ServerInterface): void;
}
