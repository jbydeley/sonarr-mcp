import { describe, it, expect, vi } from "vitest";
import { SearchSeriesUseCase } from "./search-series.usecase.js";
import type { SearchSeriesSchema } from "@/interfaces/mcp/search-series/search-series.schema.js";

describe("SearchSeriesUseCase", () => {
  it("should search for series", () => {
    const repository = {
      searchSeries: vi.fn(),
    };

    const useCase = new SearchSeriesUseCase(repository);

    const inputData: SearchSeriesSchema = {
      term: "Test Series",
    };

    useCase.execute(inputData);

    expect(repository.searchSeries).toHaveBeenCalledWith(inputData.term);
  });
});
