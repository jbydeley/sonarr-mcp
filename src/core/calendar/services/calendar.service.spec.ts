import { describe, it, expect, vi } from "vitest";
import { CalendarService } from "./calendar.service.js";

describe("CalendarService", () => {
  it("should list upcoming episodes", () => {
    const repository = {
      listUpcomingEpisodes: vi.fn(),
    };

    const service = new CalendarService(repository);

    service.listUpcomingEpisodes({
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
