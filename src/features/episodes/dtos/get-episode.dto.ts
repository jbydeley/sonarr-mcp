import { z } from "zod";

export const GetEpisodeSchema = z.object({
  id: z.number().describe("The ID of the episode to get"),
});

export type GetEpisodeDto = z.infer<typeof GetEpisodeSchema>;
