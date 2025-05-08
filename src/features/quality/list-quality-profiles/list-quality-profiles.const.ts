import { listQualityProfilesHandler } from "./list-quality-profiles.handler.js";
import { ToolRegistration } from "@/common/types.js";

export const ListQualityProfilesToolName = "ListQualityProfiles";
export const ListQualityProfilesToolDescription = "List quality profiles";
export const ListQualityProfilesToolHandler = listQualityProfilesHandler;

export const listQualityProfilesToolRegistration: ToolRegistration<null> = {
  name: ListQualityProfilesToolName,
  description: ListQualityProfilesToolDescription,
  handler: ListQualityProfilesToolHandler,
};
