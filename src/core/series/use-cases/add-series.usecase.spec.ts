import { describe, it, expect, vi } from "vitest";
import { AddSeriesUseCase } from "./add-series.usecase.js";
import type { AddSeriesSchema } from "@/interfaces/mcp/add-series/add-series.schema.js";
import { TvdbIdVo } from "../value-objects/tvdb-id.vo.js";

describe("AddSeriesUseCase", () => {
  it("should add a series", () => {
    const repository = {
      addSeries: vi.fn(),
    };

    const useCase = new AddSeriesUseCase(repository);

    const inputData: AddSeriesSchema = {
      title: "Test Series",
      tvdbId: 1,
      qualityProfileId: 1,
      rootFolderPath: "/tv",
      monitored: true,
      seasonFolder: true,
      addOptions: {
        searchForMissingEpisodes: true,
      },
    };

    useCase.execute(new TvdbIdVo(inputData.tvdbId), inputData);

    expect(repository.addSeries).toHaveBeenCalledWith(
      new TvdbIdVo(inputData.tvdbId),
      inputData
    );
  });
});
