import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { QualityDefinition } from "@/common/entities/quality-definition.entity.js";

export const enabled = true;

export const resourceName = "quality-definition";
export const resourceUri = "sonarr://quality-definition";

export const resourceHandler = async (
  uri: URL,
  _extra: any
): Promise<ReadResourceResult> => {
  const sonarrHttpClient = new SonarrHttpClient();
  const qualityDefinitions = await sonarrHttpClient.get<QualityDefinition[]>(
    `/api/v3/qualityDefinition`
  );

  return {
    contents: qualityDefinitions.map((qualityDefinition) => ({
      uri: `${uri.pathname}/${qualityDefinition.id}`,
      mimeType: "application/json",
      text: JSON.stringify(qualityDefinition),
    })),
  };
};
