import { z } from 'zod';

export const OriginalLanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type OriginalLanguage = z.infer<typeof OriginalLanguageSchema>;
