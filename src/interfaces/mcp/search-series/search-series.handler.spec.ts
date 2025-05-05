import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchSeriesHandler } from "./search-series.handler.js";
import type { SeriesService } from "@/core/series/services/series.service.js";
import type { Series } from "@/core/series/entities/series.entity.js";

describe("SearchSeriesHandler", () => {
  let seriesService: Pick<SeriesService, "searchSeries">;

  beforeEach(() => {
    seriesService = {
      searchSeries: vi.fn().mockResolvedValue([] as Series[]),
    };
  });

  it("should call the series service", async () => {
    await searchSeriesHandler({ term: "test" }, { seriesService } as any);

    expect(seriesService.searchSeries).toHaveBeenCalledWith({ term: "test" });
  });

  it("should return the series", async () => {
    const series = await searchSeriesHandler({ term: "test" }, {
      seriesService,
    } as any);

    expect(series).toEqual({
      content: [
        {
          type: "text",
          text: JSON.stringify([] as Series[]),
        },
      ],
    });
  });
});
