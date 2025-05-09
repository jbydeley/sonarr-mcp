import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { QualityProfile } from "@/common/entities/quality-profile.entity.js";

export const enabled = true;

export const resourceName = "quality-profiles";
export const resourceUri = "sonarr://quality-profiles";

export const resourceHandler = async (
  uri: URL,
  _extra: any
): Promise<ReadResourceResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const qualityProfiles = await sonarrHttpClient.get<QualityProfile[]>(
    `/api/v3/qualityProfile`
  );

  return {
    contents: qualityProfiles.map((qualityProfile) => ({
      uri: `${uri.pathname}/${qualityProfile.id}`,
      mimeType: "application/json",
      text: JSON.stringify(qualityProfile),
    })),
  };
};
