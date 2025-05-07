import { describe, it, expect, vi } from "vitest";
import { ListUpcomingEpisodesUseCase } from "./list-upcoming-episodes.usecase.js";
import { DateRangeVO } from "../value-objects/date-range.vo.js";

describe("ListUpcomingEpisodesUseCase", () => {
  it("should list upcoming episodes", () => {
    const repository = {
      listUpcomingEpisodes: vi.fn(),
    };

    const useCase = new ListUpcomingEpisodesUseCase(repository);

    useCase.execute({
      start: new Date("2025-05-06"),
      end: new Date("2025-05-06"),
      unmonitored: false,
      includeSeries: false,
      includeEpisodeFile: false,
      includeEpisodeImages: false,
      tags: [],
    });

    expect(repository.listUpcomingEpisodes).toHaveBeenCalled();
  });
});
