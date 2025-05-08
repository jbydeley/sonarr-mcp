import { z } from "zod";

export const QualitySchema = z.object({
  id: z.number(),
  name: z.string(),
  source: z.string(),
  resolution: z.number(),
});

export type Quality = z.infer<typeof QualitySchema>;

export const QualityDefinitionSchema = z.object({
  id: z.number(),
  quality: QualitySchema,
  title: z.string(),
  weight: z.number(),
  minSize: z.number(),
  maxSize: z.number(),
  preferredSize: z.number(),
});

export type QualityDefinition = z.infer<typeof QualityDefinitionSchema>;
