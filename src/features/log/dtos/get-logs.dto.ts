import { z } from "zod";

export const GetLogsSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  sortKey: z.string().default("date"),
  sortDirection: z
    .enum(["default", "ascending", "descending"])
    .default("default"),
  level: z.enum(["debug", "info", "warning", "error"]).default("info"),
});

export type GetLogsDto = z.infer<typeof GetLogsSchema>;
