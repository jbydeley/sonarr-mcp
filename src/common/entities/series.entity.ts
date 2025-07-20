import { z } from 'zod';
import { ImageSchema } from '@/common/entities/image.entity.js';
import { OriginalLanguageSchema } from '@/common/entities/original-language.entity.js';
import { RatingsSchema } from '@/common/entities/ratings.entity.js';
import { SeasonSchema } from '@/common/entities/season.entity.js';
import { StatisticsSchema } from '@/common/entities/statistics.entity.js';

export const SeriesSchema = z.object({
  title: z.string(),
  sortTitle: z.string(),
  status: z.string(),
  ended: z.boolean(),
  overview: z.string(),
  network: z.string(),
  images: z.array(ImageSchema),
  originalLanguage: OriginalLanguageSchema,
  remotePoster: z.string(),
  seasons: z.array(SeasonSchema),
  year: z.number(),
  path: z.string(),
  qualityProfileId: z.number(),
  seasonFolder: z.boolean(),
  monitored: z.boolean(),
  monitorNewItems: z.string(),
  useSceneNumbering: z.boolean(),
  runtime: z.number(),
  tvdbId: z.number(),
  tvRageId: z.number(),
  tvMazeId: z.number(),
  tmdbId: z.number(),
  firstAired: z.string(),
  lastAired: z.string(),
  seriesType: z.string(),
  cleanTitle: z.string(),
  imdbId: z.string(),
  titleSlug: z.string(),
  folder: z.string(),
  certification: z.string(),
  genres: z.array(z.string()),
  tags: z.array(z.any()),
  added: z.string(),
  ratings: RatingsSchema,
  statistics: StatisticsSchema,
  languageProfileId: z.number(),
  id: z.number(),
});

export type Series = z.infer<typeof SeriesSchema>;
