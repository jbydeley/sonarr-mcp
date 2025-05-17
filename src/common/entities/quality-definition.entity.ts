import { z } from 'zod';
import { QualitySchema } from './quality.entity.js';

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
