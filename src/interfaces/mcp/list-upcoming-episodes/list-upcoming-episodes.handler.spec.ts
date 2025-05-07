import { describe, it, expect, vi } from "vitest";
import { listUpcomingEpisodesHandler } from "./list-upcoming-episodes.handler.js";

describe("listUpcomingEpisodesHandler", () => {
  it("should list upcoming episodes", async () => {
    const service = {
      listUpcomingEpisodes: vi.fn(),
    };

    await listUpcomingEpisodesHandler(
      {
        start: new Date("2025-05-06"),
        end: new Date("2025-05-06"),
        unmonitored: false,
        includeSeries: false,
        includeEpisodeFile: false,
        includeEpisodeImages: false,
        tags: [],
      },
      {
        calendarService: service,
      }
    );

    expect(service.listUpcomingEpisodes).toHaveBeenCalled();
  });
});
