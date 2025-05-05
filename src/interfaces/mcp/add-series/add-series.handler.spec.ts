import { describe, it, expect, vi, beforeEach } from "vitest";
import { AddSeriesSchema } from "./add-series.schema.js";
import { addSeriesHandler } from "./add-series.handler.js";
import type { SeriesService } from "@/core/series/services/series.service.js";
import type { Series } from "@/core/series/entities/series.entity.js";
import { TvdbIdVo } from "@/core/series/value-objects/tvdb-id.vo.js";

describe("AddSeriesHandler", () => {
  let seriesService: Pick<SeriesService, "addSeries">;

  beforeEach(() => {
    seriesService = {
      addSeries: vi.fn().mockResolvedValue({} as Series),
    };
  });

  it("should call the series service", async () => {
    await addSeriesHandler(
      { tvdbId: 1 } as AddSeriesSchema,
      { seriesService } as any
    );

    expect(seriesService.addSeries).toHaveBeenCalledWith(new TvdbIdVo(1), {
      tvdbId: 1,
    } as AddSeriesSchema);
  });

  it("should return the series", async () => {
    const series = await addSeriesHandler(
      { tvdbId: 1 } as AddSeriesSchema,
      {
        seriesService,
      } as any
    );

    expect(series).toEqual({
      content: [
        {
          type: "text",
          text: JSON.stringify({} as Series),
        },
      ],
    });
  });
});
