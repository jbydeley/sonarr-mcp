import type { ListUpcomingEpisodesSchema } from "./list-upcoming-episodes.schema.js";
import type { CalendarService } from "@/core/calendar/services/calendar.service.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const listUpcomingEpisodesHandler = async (
  input: ListUpcomingEpisodesSchema,
  deps: { calendarService: Pick<CalendarService, "listUpcomingEpisodes"> }
): Promise<CallToolResult> => {
  const episodes = await deps.calendarService.listUpcomingEpisodes(input);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(episodes),
      },
    ],
  };
};
