import { describe, it, expect, vi } from "vitest";
import { SeriesService } from "./series.service.js";
import type { SeriesRepository } from "@/core/series/ports/series.repository.js";
import type { Series } from "@/core/series/entities/series.entity.js";
import { TvdbIdVo } from "@/core/series/value-objects/tvdb-id.vo.js";

describe("SeriesService", () => {
  it("should search for series", async () => {
    const repository = {
      searchSeries: vi.fn().mockResolvedValue([] as Series[]),
      addSeries: vi.fn().mockResolvedValue({} as Series),
    } as SeriesRepository;

    const service = new SeriesService(repository);

    const result = await service.searchSeries({ term: "test" });

    expect(result).toEqual([]);
  });

  it("should add a series", async () => {
    const repository = {
      searchSeries: vi.fn().mockResolvedValue([] as Series[]),
      addSeries: vi.fn().mockResolvedValue({} as Series),
    } as SeriesRepository;

    const service = new SeriesService(repository);

    const result = await service.addSeries(new TvdbIdVo(1), {
      title: "test",
      tvdbId: 1,
      qualityProfileId: 1,
      rootFolderPath: "/tv",
      monitored: true,
      seasonFolder: true,
      addOptions: {
        searchForMissingEpisodes: true,
      },
    });

    expect(result).toEqual({});
  });
});
