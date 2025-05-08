import { z } from "zod";

export const MediaInfoSchema = z.object({
  // placeholder for now
});
export type MediaInfo = z.infer<typeof MediaInfoSchema>;
