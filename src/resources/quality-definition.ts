import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import type { QualityDefinition } from '@/common/entities/quality-definition.entity.js';
import { runSonarrResource } from '@/common/mcp-helpers.js';

export const qualityDefinitionResourceHandler = async (
  uri: URL,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const qualityDefinitions = await runSonarrResource<QualityDefinition[]>((client) =>
    client.get('/api/v3/qualityDefinition'),
  );

  return {
    contents: qualityDefinitions.map((qualityDefinition) => ({
      uri: `${uri.href}/${qualityDefinition.id}`,
      mimeType: 'application/json',
      text: JSON.stringify(qualityDefinition),
    })),
  };
};
