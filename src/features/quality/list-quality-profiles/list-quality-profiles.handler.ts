import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { QualityProfile } from "@/common/entities/quality-profile.entity.js";

export const listQualityProfilesHandler = async (): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const qualityProfiles = await sonarrHttpClient.get<QualityProfile[]>(
    `/api/v3/qualityProfiles`
  );

  return {
    content: qualityProfiles.map((qualityProfile) => ({
      type: "text",
      text: JSON.stringify(qualityProfile),
    })),
  };
};
