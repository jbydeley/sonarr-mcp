import { z } from "zod";

export const CustomFormatSchema = z.object({
  id: z.number(),
  name: z.string(),
  score: z.number(),
});
export type CustomFormat = z.infer<typeof CustomFormatSchema>;
