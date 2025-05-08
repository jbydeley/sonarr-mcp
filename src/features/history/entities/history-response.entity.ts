import { z } from "zod";
import { HistoryRecordSchema } from "./history-record.entity.js";

export const HistoryResponseSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  sortKey: z.string(),
  sortDirection: z.string(),
  totalRecords: z.number(),
  records: z.array(HistoryRecordSchema),
});

export type HistoryResponse = z.infer<typeof HistoryResponseSchema>;
