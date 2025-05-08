import { z } from "zod";
import { LanguageSchema } from "./language.entity.js";
import { QualitySchema } from "./quality.entity.js";

export const EpisodeFileSchema = z.object({
  id: z.number(),
  seriesId: z.number(),
  seasonNumber: z.number(),
  relativePath: z.string(),
  path: z.string(),
  size: z.number(),
  dateAdded: z.string(),
  sceneName: z.string(),
  releaseGroup: z.string(),
  languages: z.array(LanguageSchema),
  quality: QualitySchema,
  customFormats: z.array(z.any()),
  customFormatScore: z.number(),
  indexerFlags: z.number(),
  releaseType: z.string(),
  mediaInfo: z.any(),
  qualityCutoffNotMet: z.boolean(),
});
export type EpisodeFile = z.infer<typeof EpisodeFileSchema>;
