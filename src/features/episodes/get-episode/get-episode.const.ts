import { getEpisodeHandler } from "./get-episode.handler.js";
import { GetEpisodeDto } from "@/features/episodes/dtos/get-episode.dto.js";
import { ToolRegistration } from "@/common/types.js";
import { GetEpisodeSchema } from "@/features/episodes/dtos/get-episode.dto.js";

export const GetEpisodeToolName = "GetEpisode";
export const GetEpisodeToolDescription = "Get an episode by ID";
export const GetEpisodeToolHandler = getEpisodeHandler;
export const GetEpisodeToolSchema = GetEpisodeSchema;

export const getEpisodeToolRegistration: ToolRegistration<GetEpisodeDto> = {
  name: GetEpisodeToolName,
  description: GetEpisodeToolDescription,
  schema: GetEpisodeToolSchema.shape,
  handler: GetEpisodeToolHandler,
};
