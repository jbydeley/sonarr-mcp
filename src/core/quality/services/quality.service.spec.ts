import { describe, it, expect, vi } from "vitest";
import { QualityService } from "./quality.service.js";

describe("QualityService", () => {
  it("should list qualities", () => {
    const repository = {
      getQualityProfiles: vi.fn(),
    };

    const service = new QualityService(repository);

    service.listQualities();

    expect(repository.getQualityProfiles).toHaveBeenCalled();
  });
});
