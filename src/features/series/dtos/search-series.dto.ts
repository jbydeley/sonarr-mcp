import { z } from "zod";

export const SearchSeriesSchema = z.object({
  term: z.string().describe("The term to search for"),
});

export type SearchSeriesDto = z.infer<typeof SearchSeriesSchema>;
