import { describe, it, expect, vi } from "vitest";
import { SonarrRepository } from "./sonarr.repository.js";
import type { HttpClient } from "@/core/common/ports/http-client.interface.js";
import type { Series } from "@/core/series/entities/series.entity.js";
import { QualityProfile } from "@/core/quality/entities/quality-profile.entity.js";
import { TvdbIdVo } from "@/core/series/value-objects/tvdb-id.vo.js";

describe("SonarrRepository", () => {
  describe("Series", () => {
    it("should search for series", async () => {
      const httpClient = {
        get: vi.fn().mockResolvedValue([] as Series[]),
        post: vi.fn().mockResolvedValue({} as Series),
      } as HttpClient;

      const repository = new SonarrRepository(httpClient);

      const result = await repository.searchSeries("test");

      expect(result).toEqual([]);
    });

    it("should handle search error", async () => {
      const httpClient = {
        get: vi.fn().mockRejectedValue(new Error("test")),
        post: vi.fn().mockRejectedValue(new Error("test")),
      } as HttpClient;

      const repository = new SonarrRepository(httpClient);

      await expect(repository.searchSeries("test")).rejects.toThrow("test");
    });

    it("should add a series", async () => {
      const httpClient = {
        get: vi.fn().mockResolvedValue([] as Series[]),
        post: vi.fn().mockResolvedValue({} as Series),
      } as HttpClient;

      const repository = new SonarrRepository(httpClient);

      const result = await repository.addSeries(new TvdbIdVo(1), {
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

    it("should handle add error", async () => {
      const httpClient = {
        get: vi.fn().mockResolvedValue([] as Series[]),
        post: vi.fn().mockRejectedValue(new Error("test")),
      } as HttpClient;

      const repository = new SonarrRepository(httpClient);

      await expect(
        repository.addSeries(new TvdbIdVo(1), {
          title: "test",
          tvdbId: 1,
          qualityProfileId: 1,
          rootFolderPath: "/tv",
          monitored: true,
          seasonFolder: true,
          addOptions: {
            searchForMissingEpisodes: true,
          },
        })
      ).rejects.toThrow("test");
    });
  });

  describe("Quality", () => {
    it("should get quality profiles", async () => {
      const httpClient = {
        get: vi.fn().mockResolvedValue([] as QualityProfile[]),
      } as unknown as HttpClient;

      const repository = new SonarrRepository(httpClient);

      const result = await repository.getQualityProfiles();

      expect(result).toEqual([]);
    });
  });
});
