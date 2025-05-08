import { ListRecentDownloadsDto } from "@/features/history/dtos/list-recent-downloads.dto.js";
import { ToolRegistration } from "@/common/types.js";
import { listRecentDownloadsHandler } from "./list-recent-downloads.handler.js";
import { ListRecentDownloadsSchema } from "@/features/history/dtos/list-recent-downloads.dto.js";

export const ListRecentDownloadsToolName = "ListRecentDownloads";
export const ListRecentDownloadsToolDescription = "List recent downloads";
export const ListRecentDownloadsToolHandler = listRecentDownloadsHandler;
export const ListRecentDownloadsToolSchema = ListRecentDownloadsSchema.shape;

export const listRecentDownloadsToolRegistration: ToolRegistration<ListRecentDownloadsDto> =
  {
    name: ListRecentDownloadsToolName,
    description: ListRecentDownloadsToolDescription,
    schema: ListRecentDownloadsToolSchema,
    handler: ListRecentDownloadsToolHandler,
  };
