import { z } from 'zod';

export const ImageSchema = z.object({
  coverType: z.string(),
  url: z.string(),
  remoteUrl: z.string(),
});

export type Image = z.infer<typeof ImageSchema>;
