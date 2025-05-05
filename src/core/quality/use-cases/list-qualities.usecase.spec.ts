import { describe, it, expect, vi } from "vitest";
import { ListQualitiesUseCase } from "./list-qualities.usecase.js";

describe("ListQualitiesUseCase", () => {
  it("should list qualities", () => {
    const repository = {
      getQualityProfiles: vi.fn(),
    };

    const useCase = new ListQualitiesUseCase(repository);

    useCase.execute();

    expect(repository.getQualityProfiles).toHaveBeenCalled();
  });
});
