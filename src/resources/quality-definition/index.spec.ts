import { describe, it, expect, beforeEach, afterEach } from "vitest";
import nock from "nock";
import * as qualityDefinitionResource from "./index.js";

describe("quality-definition resource", () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error("Not all nock interceptors were used!");
    }
  });
  it("should export a resourceUri", () => {
    expect(qualityDefinitionResource.resourceUri).toBeDefined();
    expect(typeof qualityDefinitionResource.resourceUri).toBe("string");
  });

  it("should export a quality-definition resourceHandler and return mocked data", async () => {
    nock("http://localhost:8989")
      .get("/api/v3/qualityDefinition")
      .reply(200, [{ id: 1, name: "HDTV-720p" }]);
    expect(typeof qualityDefinitionResource.resourceHandler).toBe("function");
    const result = await qualityDefinitionResource.resourceHandler(
      new URL(qualityDefinitionResource.resourceUri),
      {}
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.contents)).toBe(true);
    expect((result.contents as any)[0].mimeType).toBe("application/json");
    expect((result.contents as any)[0].text).toBe(
      JSON.stringify({ id: 1, name: "HDTV-720p" })
    );
  });
});
