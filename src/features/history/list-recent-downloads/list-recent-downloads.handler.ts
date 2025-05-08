import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { ListRecentDownloadsDto } from "@/features/history/dtos/list-recent-downloads.dto.js";
import { toUrlParams } from "@/common/to-url-params.js";
import { HistoryRecord } from "@/features/history/entities/history-record.entity.js";

export const listRecentDownloadsHandler = async (
  data: ListRecentDownloadsDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(data);

  const recentDownloads = await sonarrHttpClient.get<HistoryRecord[]>(
    `/api/v3/history?${params.toString()}`
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(recentDownloads),
      },
    ],
  };
};
