import { z } from "zod";

export const ListQualitiesSchema = z.object({});

export type ListQualitiesSchema = z.infer<typeof ListQualitiesSchema>;
