import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { createSonarrGateway } from '@/common/mcp-helpers.js';

export const qualityProfilesResourceHandler = async (
  uri: URL,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const gateway = createSonarrGateway();
  const qualityProfiles = await gateway.getQualityProfiles();

  return {
    contents: qualityProfiles.map((qualityProfile) => ({
      uri: `${uri.href}/${qualityProfile.id}`,
      mimeType: 'application/json',
      text: JSON.stringify(qualityProfile),
    })),
  };
};
