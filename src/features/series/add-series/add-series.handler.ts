import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { AddSeriesDto } from "@/features/series/dtos/add-series.dto.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { Series } from "@/common/entities/series.entity.js";

export const addSeriesHandler = async (
  data: AddSeriesDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();
  const series = await sonarrHttpClient.post<Series>(`/api/v3/series`, {
    data,
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(series),
      },
    ],
  };
};
