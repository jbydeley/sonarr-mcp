import type { CalendarRepository } from "../ports/calendar.repository.js";
import type { Episode } from "../entities/episode.entity.js";
import { ListUpcomingEpisodesSchema } from "@/interfaces/mcp/list-upcoming-episodes/list-upcoming-episodes.schema.js";
import { DateRangeVO } from "../value-objects/date-range.vo.js";

export class ListUpcomingEpisodesUseCase {
  constructor(
    private readonly calendarRepository: Pick<
      CalendarRepository,
      "listUpcomingEpisodes"
    >
  ) {}

  async execute(input: ListUpcomingEpisodesSchema): Promise<Episode[]> {
    const dateRange = new DateRangeVO(input.start, input.end);

    return this.calendarRepository.listUpcomingEpisodes({
      dateRange,
      unmonitored: input.unmonitored,
      includeSeries: input.includeSeries,
      includeEpisodeFile: input.includeEpisodeFile,
      includeEpisodeImages: input.includeEpisodeImages,
      tags: input.tags,
    });
  }
}
