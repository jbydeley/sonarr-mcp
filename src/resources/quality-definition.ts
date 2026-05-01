import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { runSonarrResource } from '@/common/mcp-helpers.js';

export const qualityDefinitionResourceHandler = async (
  uri: URL,
  _extra: Record<string, unknown>,
): Promise<ReadResourceResult> => {
  const qualityDefinitions = await runSonarrResource((gateway) =>
    gateway.getQualityDefinitions(),
  );

  return {
    contents: qualityDefinitions.map((qualityDefinition) => ({
      uri: `${uri.href}/${qualityDefinition.id}`,
      mimeType: 'application/json',
      text: JSON.stringify(qualityDefinition),
    })),
  };
};
