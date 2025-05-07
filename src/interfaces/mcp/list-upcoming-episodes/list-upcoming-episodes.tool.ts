import { ToolInterface } from "../tool.interface.js";
import type { ServerInterface } from "../server.interface.js";
import { ListUpcomingEpisodesSchema } from "./list-upcoming-episodes.schema.js";
import type { CalendarService } from "@/core/calendar/services/calendar.service.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { listUpcomingEpisodesHandler } from "./list-upcoming-episodes.handler.js";

export class ListUpcomingEpisodesTool implements ToolInterface {
  constructor(
    private readonly service: Pick<CalendarService, "listUpcomingEpisodes">
  ) {}

  register(server: ServerInterface) {
    server.tool(
      "ListUpcomingEpisodes",
      "List upcoming episodes",
      ListUpcomingEpisodesSchema.shape,
      (input: ListUpcomingEpisodesSchema): Promise<CallToolResult> =>
        listUpcomingEpisodesHandler(input, { calendarService: this.service })
    );
  }
}
