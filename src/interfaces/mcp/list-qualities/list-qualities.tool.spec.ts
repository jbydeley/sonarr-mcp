import { describe, it, expect, vi } from "vitest";
import { ListQualitiesTool } from "./list-qualities.tool.js";
import type { QualityService } from "@/core/quality/services/quality.service.js";
import { ListQualitiesSchema } from "./list-qualities.schema.js";

describe("ListQualitiesTool", () => {
  it("should register the tool", () => {
    const tool = new ListQualitiesTool({} as QualityService);
    expect(tool.register).toBeDefined();

    const server = {
      tool: vi.fn(),
    };

    tool.register(server);

    expect(server.tool).toHaveBeenCalledWith(
      "ListQualities",
      "List qualities",
      ListQualitiesSchema.shape,
      expect.any(Function)
    );
  });
});
