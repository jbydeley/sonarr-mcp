import { listUpcomingEpisodesHandler } from "./list-upcoming-episodes.handler.js";
import { ToolRegistration } from "@/common/types.js";
import {
  ListUpcomingEpisodesDto,
  ListUpcomingEpisodesSchema,
} from "@/features/episodes/dtos/list-upcoming-episodes.dto.js";

export const ListUpcomingEpisodesToolName = "ListUpcomingEpisodes";
export const ListUpcomingEpisodesToolDescription = "List upcoming episodes";
export const ListUpcomingEpisodesToolHandler = listUpcomingEpisodesHandler;

export const listUpcomingEpisodesToolRegistration: ToolRegistration<ListUpcomingEpisodesDto> =
  {
    name: ListUpcomingEpisodesToolName,
    description: ListUpcomingEpisodesToolDescription,
    schema: ListUpcomingEpisodesSchema.shape,
    handler: ListUpcomingEpisodesToolHandler,
  };
