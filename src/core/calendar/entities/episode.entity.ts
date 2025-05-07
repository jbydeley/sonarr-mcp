import { z } from "zod";

export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const SelectOptionSchema = z.object({
  value: z.number(),
  name: z.string(),
  order: z.number(),
  hint: z.string(),
});

export const FieldSchema = z.object({
  order: z.number(),
  name: z.string(),
  label: z.string(),
  unit: z.string(),
  helpText: z.string(),
  helpTextWarning: z.string(),
  helpLink: z.string(),
  value: z.string(),
  type: z.string(),
  advanced: z.boolean(),
  selectOptions: z.array(SelectOptionSchema),
  selectOptionsProviderAction: z.string(),
  section: z.string(),
  hidden: z.string(),
  privacy: z.string(),
  placeholder: z.string(),
  isFloat: z.boolean(),
});

export const SpecificationSchema = z.object({
  id: z.number(),
  name: z.string(),
  implementation: z.string(),
  implementationName: z.string(),
  infoLink: z.string(),
  negate: z.boolean(),
  required: z.boolean(),
  fields: z.array(FieldSchema),
  presets: z.array(z.string()),
});

export const CustomFormatSchema = z.object({
  id: z.number(),
  name: z.string(),
  includeCustomFormatWhenRenaming: z.boolean(),
  specifications: z.array(SpecificationSchema),
});

export const QualityRevisionSchema = z.object({
  version: z.number(),
  real: z.number(),
  isRepack: z.boolean(),
});

export const QualityQualitySchema = z.object({
  id: z.number(),
  name: z.string(),
  source: z.string(),
  resolution: z.number(),
});

export const QualitySchema = z.object({
  quality: QualityQualitySchema,
  revision: QualityRevisionSchema,
});

export const MediaInfoSchema = z.object({
  id: z.number(),
  audioBitrate: z.number(),
  audioChannels: z.number(),
  audioCodec: z.string(),
  audioLanguages: z.string(),
  audioStreamCount: z.number(),
  videoBitDepth: z.number(),
  videoBitrate: z.number(),
  videoCodec: z.string(),
  videoFps: z.number(),
  videoDynamicRange: z.string(),
  videoDynamicRangeType: z.string(),
  resolution: z.string(),
  runTime: z.string(),
  scanType: z.string(),
  subtitles: z.string(),
});

export const ImageSchema = z.object({
  coverType: z.string(),
  url: z.string(),
  remoteUrl: z.string(),
});

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
  customFormats: z.array(CustomFormatSchema),
  customFormatScore: z.number(),
  indexerFlags: z.number(),
  releaseType: z.string(),
  mediaInfo: MediaInfoSchema,
  qualityCutoffNotMet: z.boolean(),
});

export const AlternateTitleSchema = z.object({
  title: z.string(),
  seasonNumber: z.number(),
  sceneSeasonNumber: z.number(),
  sceneOrigin: z.string(),
  comment: z.string(),
});

export const SeasonStatisticsSchema = z.object({
  nextAiring: z.string(),
  previousAiring: z.string(),
  episodeFileCount: z.number(),
  episodeCount: z.number(),
  totalEpisodeCount: z.number(),
  sizeOnDisk: z.number(),
  releaseGroups: z.array(z.string()),
  percentOfEpisodes: z.number(),
});

export const SeasonSchema = z.object({
  seasonNumber: z.number(),
  monitored: z.boolean(),
  statistics: SeasonStatisticsSchema.optional(),
  images: z.array(ImageSchema).optional(),
});

export const AddOptionsSchema = z.object({
  ignoreEpisodesWithFiles: z.boolean(),
  ignoreEpisodesWithoutFiles: z.boolean(),
  monitor: z.string(),
  searchForMissingEpisodes: z.boolean(),
  searchForCutoffUnmetEpisodes: z.boolean(),
});

export const RatingsSchema = z.object({
  votes: z.number(),
  value: z.number(),
});

export const SeriesStatisticsSchema = z.object({
  seasonCount: z.number(),
  episodeFileCount: z.number(),
  episodeCount: z.number(),
  totalEpisodeCount: z.number(),
  sizeOnDisk: z.number(),
  releaseGroups: z.array(z.string()),
  percentOfEpisodes: z.number(),
});

export const SeriesSchema = z.object({
  id: z.number(),
  title: z.string(),
  alternateTitles: z.array(AlternateTitleSchema),
  sortTitle: z.string(),
  status: z.string(),
  ended: z.boolean(),
  profileName: z.string(),
  overview: z.string(),
  nextAiring: z.string(),
  previousAiring: z.string(),
  network: z.string(),
  airTime: z.string(),
  images: z.array(ImageSchema),
  originalLanguage: LanguageSchema,
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
  rootFolderPath: z.string(),
  folder: z.string(),
  certification: z.string(),
  genres: z.array(z.string()),
  tags: z.array(z.number()),
  added: z.string(),
  addOptions: AddOptionsSchema,
  ratings: RatingsSchema,
  statistics: SeriesStatisticsSchema,
  episodesChanged: z.boolean(),
});

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
