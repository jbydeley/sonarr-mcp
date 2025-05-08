import { LogsResponse } from "../entities/log.entity.js";
import { SonarrHttpClient } from "@/common/sonarr.http-client.js";
import { GetLogsDto } from "@/features/log/dtos/get-logs.dto.js";
import { toUrlParams } from "@/common/to-url-params.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const getLogsHandler = async (
  data: GetLogsDto
): Promise<CallToolResult> => {
  const sonarrHttpClient = new SonarrHttpClient();

  const params = toUrlParams(data);

  const logs = await sonarrHttpClient.get<LogsResponse>(
    `/api/v3/log?${params.toString()}`
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(logs),
      },
    ],
  };
};
