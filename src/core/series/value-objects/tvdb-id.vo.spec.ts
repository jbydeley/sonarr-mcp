import { describe, it, expect } from "vitest";
import { TvdbIdVo } from "./tvdb-id.vo.js";

describe("TvdbIdVo", () => {
  it("should create a TVDB ID", () => {
    const tvdbId = new TvdbIdVo(1);
    expect(tvdbId.raw).toBe(1);
  });

  it("should throw if given a negative number", () => {
    expect(() => new TvdbIdVo(-1)).toThrow();
  });
});
