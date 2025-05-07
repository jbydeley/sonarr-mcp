import type { CalendarRepository } from "../ports/calendar.repository.js";
import type { Episode } from "../entities/episode.entity.js";
import { ListUpcomingEpisodesUseCase } from "../use-cases/list-upcoming-episodes.usecase.js";
import { ListUpcomingEpisodesSchema } from "@/interfaces/mcp/list-upcoming-episodes/list-upcoming-episodes.schema.js";

export class CalendarService {
  private readonly listUpcomingEpisodesUseCase: ListUpcomingEpisodesUseCase;

  constructor(
    calendarRepository: Pick<CalendarRepository, "listUpcomingEpisodes">
  ) {
    this.listUpcomingEpisodesUseCase = new ListUpcomingEpisodesUseCase(
      calendarRepository
    );
  }

  async listUpcomingEpisodes(
    input: ListUpcomingEpisodesSchema
  ): Promise<Episode[]> {
    return this.listUpcomingEpisodesUseCase.execute(input);
  }
}
