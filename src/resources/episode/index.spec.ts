import { describe, it, expect, beforeEach, afterEach } from "vitest";
import nock from "nock";
import * as episodeResource from "./index.js";

describe("episode resource", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error("Not all nock interceptors were used!");
    }
  });

  it("should export a resourceUri", () => {
    expect(episodeResource.resourceName).toBeDefined();
    expect(typeof episodeResource.resourceName).toBe("string");
  });

  it("should export a resourceHandler and return mocked data", async () => {
    nock("http://localhost:8989")
      .get("/api/v3/episode/1")
      .reply(200, { id: 1, title: "Test Episode" });
    expect(typeof episodeResource.resourceHandler).toBe("function");
    const result = await episodeResource.resourceHandler(
      new URL(
        episodeResource.resourceUri.uriTemplate.expand({
          id: "1",
        })
      ),
      { id: "1" },
      {}
    );
    expect(result).toBeDefined();
    expect((result.contents as any)[0].mimeType).toBe("application/json");
    expect((result.contents as any)[0].text).toBe(
      JSON.stringify({ id: 1, title: "Test Episode" })
    );
  });
});
