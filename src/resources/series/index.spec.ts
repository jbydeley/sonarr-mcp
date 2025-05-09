import { describe, it, expect, beforeEach, afterEach } from "vitest";
import nock from "nock";
import * as seriesResource from "./index.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

describe("series resource", () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error("Not all nock interceptors were used!");
    }
  });
  it("should export a series resourceUri", () => {
    expect(seriesResource.resourceUri).toBeDefined();
    expect(seriesResource.resourceUri).toBeInstanceOf(ResourceTemplate);
  });

  it("should export a series resourceHandler and return mocked data", async () => {
    nock("http://localhost:8989")
      .get("/api/v3/series/1")
      .reply(200, { id: 1, title: "Test Series" });
    expect(typeof seriesResource.resourceHandler).toBe("function");
    const result = await seriesResource.resourceHandler(
      new URL(seriesResource.resourceUri.uriTemplate.expand({ id: "1" })),
      { id: "1" },
      {}
    );
    expect(result).toBeDefined();
    expect((result.contents as any)[0].mimeType).toBe("application/json");
    expect((result.contents as any)[0].text).toBe(
      JSON.stringify({ id: 1, title: "Test Series" })
    );
  });
});
