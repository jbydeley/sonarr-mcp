import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { QualityProfile } from '@/common/entities/quality-profile.entity.js';
import { SonarrHttpClient } from '@/common/sonarr.http-client.js';

export const qualityProfilesResourceHandler = async (
  uri: URL,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const qualityProfiles = await sonarrHttpClient.get<QualityProfile[]>(
    '/api/v3/qualityProfile',
  );

  return {
    contents: qualityProfiles.map((qualityProfile) => ({
      uri: `${uri.pathname}/${qualityProfile.id}`,
      mimeType: 'application/json',
      text: JSON.stringify(qualityProfile),
    })),
  };
};
