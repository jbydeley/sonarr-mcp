import type { Episode } from "../entities/episode.entity.js";
import { ListUpcomingEpisodesSchema } from "@/interfaces/mcp/list-upcoming-episodes/list-upcoming-episodes.schema.js";
import { DateRangeVO } from "../value-objects/date-range.vo.js";

export interface CalendarRepository {
  listUpcomingEpisodes(
    args: Omit<ListUpcomingEpisodesSchema, "start" | "end"> & {
      dateRange: DateRangeVO;
    }
  ): Promise<Episode[]>;
}
