import { describe, it, expect, vi, beforeEach } from "vitest";
import { listQualitiesHandler } from "./list-qualities.handler.js";
import type { QualityService } from "@/core/quality/services/quality.service.js";
import type { QualityProfile } from "@/core/quality/entities/quality-profile.entity.js";

describe("ListQualitiesHandler", () => {
  let qualityService: Pick<QualityService, "listQualities">;

  beforeEach(() => {
    qualityService = {
      listQualities: vi.fn().mockResolvedValue([] as QualityProfile[]),
    };
  });

  it("should call the quality service", async () => {
    await listQualitiesHandler({}, { qualityService });

    expect(qualityService.listQualities).toHaveBeenCalled();
  });

  it("should return the qualities", async () => {
    const result = await listQualitiesHandler({}, { qualityService });

    expect(result).toEqual({
      content: [
        {
          type: "text",
          text: JSON.stringify([] as QualityProfile[]),
        },
      ],
    });
  });
});
