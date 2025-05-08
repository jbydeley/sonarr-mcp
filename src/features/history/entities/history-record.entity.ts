import { z } from "zod";
import { LanguageSchema } from "@/common/entities/language.entity.js";
import { QualitySchema } from "@/common/entities/quality.entity.js";
import { CustomFormatSchema } from "@/common/entities/custom-format.entity.js";
import { EpisodeSchema } from "@/common/entities/episode.entity.js";
import { SeriesSchema } from "@/common/entities/series.entity.js";

export const HistoryRecordSchema = z.object({
  id: z.number(),
  episodeId: z.number(),
  seriesId: z.number(),
  sourceTitle: z.string(),
  languages: z.array(LanguageSchema),
  quality: QualitySchema,
  customFormats: z.array(CustomFormatSchema),
  customFormatScore: z.number(),
  qualityCutoffNotMet: z.boolean(),
  date: z.string().datetime(),
  downloadId: z.string(),
  eventType: z.string(),
  data: z.record(z.string(), z.string()),
  episode: EpisodeSchema.optional(),
  series: SeriesSchema.optional(),
});

export type HistoryRecord = z.infer<typeof HistoryRecordSchema>;
