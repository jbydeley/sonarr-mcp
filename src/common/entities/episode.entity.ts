import { z } from 'zod';
import { EpisodeFileSchema } from '@/common/entities/episode-file.entity.js';
import { ImageSchema } from './image.entity.js';
import { SeriesSchema } from './series.entity.js';

export const EpisodeSchema = z.object({
  id: z.number(),
  seriesId: z.number(),
  tvdbId: z.number(),
  episodeFileId: z.number(),
  seasonNumber: z.number(),
  episodeNumber: z.number(),
  title: z.string(),
  airDate: z.string(),
  airDateUtc: z.string(),
  lastSearchTime: z.string(),
  runtime: z.number(),
  finaleType: z.string(),
  overview: z.string(),
  episodeFile: EpisodeFileSchema,
  hasFile: z.boolean(),
  monitored: z.boolean(),
  absoluteEpisodeNumber: z.number(),
  sceneAbsoluteEpisodeNumber: z.number(),
  sceneEpisodeNumber: z.number(),
  sceneSeasonNumber: z.number(),
  unverifiedSceneNumbering: z.boolean(),
  endTime: z.string(),
  grabDate: z.string(),
  series: SeriesSchema,
  images: z.array(ImageSchema),
});

export type Episode = z.infer<typeof EpisodeSchema>;
