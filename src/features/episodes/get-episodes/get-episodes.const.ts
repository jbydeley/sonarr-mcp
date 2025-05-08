import { getEpisodesHandler } from "./get-episodes.handler.js";
import { GetEpisodesDto } from "@/features/episodes/dtos/get-episodes.dto.js";
import { ToolRegistration } from "@/common/types.js";
import { GetEpisodesSchema } from "@/features/episodes/dtos/get-episodes.dto.js";

export const GetEpisodesToolName = "GetEpisodes";
export const GetEpisodesToolDescription = "Get episodes";
export const GetEpisodesToolHandler = getEpisodesHandler;
export const GetEpisodesToolSchema = GetEpisodesSchema;

export const getEpisodesToolRegistration: ToolRegistration<GetEpisodesDto> = {
  name: GetEpisodesToolName,
  description: GetEpisodesToolDescription,
  schema: GetEpisodesToolSchema.shape,
  handler: GetEpisodesToolHandler,
};
