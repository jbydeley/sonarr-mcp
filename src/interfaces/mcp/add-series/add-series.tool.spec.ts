import { describe, it, expect, vi } from "vitest";
import { AddSeriesTool } from "./add-series.tool.js";
import type { SeriesService } from "@/core/series/services/series.service.js";
import { AddSeriesSchema } from "./add-series.schema.js";

describe("AddSeriesTool", () => {
  it("should register the tool", () => {
    const tool = new AddSeriesTool({} as SeriesService);
    expect(tool.register).toBeDefined();

    const server = {
      tool: vi.fn(),
    };

    tool.register(server);

    expect(server.tool).toHaveBeenCalledWith(
      "AddSeries",
      "Add a series",
      AddSeriesSchema.shape,
      expect.any(Function)
    );
  });
});
