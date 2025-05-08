import { z } from "zod";

export const ListRecentDownloadsSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  sortKey: z.string().default("date"),
  sortDirection: z
    .enum(["default", "ascending", "descending"])
    .default("default"),
  includeSeries: z.boolean().default(false),
  includeEpisode: z.boolean().default(false),
  eventType: z
    .array(
      z.enum([
        "Unknown",
        "Grabbed",
        "SeriesFolderImported",
        "DownloadFolderImported",
        "DownloadFailed",
        "EpisodeFileDeleted",
        "EpisodeFileRenamed",
        "DownloadIgnored",
      ])
    )
    .nullish()
    .transform((val) => {
      if (!val || val.length === 0) return undefined;
      return val.map((eventType) => {
        const eventTypes = [
          "Unknown",
          "Grabbed",
          "SeriesFolderImported",
          "DownloadFolderImported",
          "DownloadFailed",
          "EpisodeFileDeleted",
          "EpisodeFileRenamed",
          "DownloadIgnored",
        ];
        return eventTypes.indexOf(eventType);
      });
    }),
  seriesIds: z
    .array(z.number())
    .nullish()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  quality: z
    .array(z.number())
    .nullish()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
});

export type ListRecentDownloadsDto = z.infer<typeof ListRecentDownloadsSchema>;
