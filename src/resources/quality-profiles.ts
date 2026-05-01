import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { QualityProfile } from '@/common/entities/quality-profile.entity.js';
import { runSonarrResource } from '@/common/mcp-helpers.js';

export const qualityProfilesResourceHandler = async (
  uri: URL,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const qualityProfiles = await runSonarrResource<QualityProfile[]>((client) =>
    client.get('/api/v3/qualityProfile'),
  );

  return {
    contents: qualityProfiles.map((qualityProfile) => ({
      uri: `${uri.href}/${qualityProfile.id}`,
      mimeType: 'application/json',
      text: JSON.stringify(qualityProfile),
    })),
  };
};
