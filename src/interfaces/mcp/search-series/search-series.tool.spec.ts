import { describe, it, expect, vi } from "vitest";
import { SearchSeriesTool } from "./search-series.tool.js";
import type { SeriesService } from "@/core/series/services/series.service.js";
import { SearchSeriesSchema } from "./search-series.schema.js";

describe("SearchSeriesTool", () => {
  it("should register the tool", () => {
    const tool = new SearchSeriesTool({} as SeriesService);
    expect(tool.register).toBeDefined();

    const server = {
      tool: vi.fn(),
    };

    tool.register(server);

    expect(server.tool).toHaveBeenCalledWith(
      "SearchSeries",
      "Search for a series",
      SearchSeriesSchema.shape,
      expect.any(Function)
    );
  });
});
