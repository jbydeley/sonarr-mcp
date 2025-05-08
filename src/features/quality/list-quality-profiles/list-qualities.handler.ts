import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { QualityProfile } from "@/common/entities/quality-profile.entity.js";

export const listQualitiesHandler = async (): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const qualities = await sonarrHttpClient.get<QualityProfile[]>(
    `/api/v3/qualityProfiles`
  );

  return {
    content: qualities.map((quality) => ({
      type: "text",
      text: JSON.stringify(quality),
    })),
  };
};
