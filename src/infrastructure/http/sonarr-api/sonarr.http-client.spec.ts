import nock from "nock";
import { SonarrHttpClient } from "./sonarr.http-client.js";
import { describe, it, expect, beforeEach } from "vitest";
import { env } from "@/infrastructure/env.js";

describe("SonarrHttpClient", () => {
  const client = new SonarrHttpClient();

  beforeEach(() => {
    nock.cleanAll();
  });

  it("should GET data from Sonarr", async () => {
    nock(env.SONARR_URL).get("/api/series").reply(200, { success: true });

    const result = await client.get("/api/series");
    expect(result).toEqual({ success: true });
  });

  it("should POST data to Sonarr", async () => {
    nock(env.SONARR_URL)
      .post("/api/series", { name: "foo" })
      .reply(201, { id: 1 });

    const result = await client.post("/api/series", { name: "foo" });
    expect(result).toEqual({ id: 1 });
  });
});
