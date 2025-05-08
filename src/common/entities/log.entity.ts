import { z } from "zod";
import { LogRecordSchema } from "./log-record.entity.js";

export const LogsResponseSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  sortKey: z.string(),
  sortDirection: z.string(),
  totalRecords: z.number(),
  records: z.array(LogRecordSchema),
});

export type LogsResponse = z.infer<typeof LogsResponseSchema>;
