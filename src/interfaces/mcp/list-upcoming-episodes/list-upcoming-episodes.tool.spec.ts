import { describe, it, expect, vi } from "vitest";
import { ListUpcomingEpisodesTool } from "./list-upcoming-episodes.tool.js";

describe("ListUpcomingEpisodesTool", () => {
  it("should list upcoming episodes", () => {
    const tool = new ListUpcomingEpisodesTool({
      listUpcomingEpisodes: vi.fn(),
    });

    const server = {
      tool: vi.fn(),
    };
    tool.register(server);

    expect(server.tool).toHaveBeenCalled();
  });
});
