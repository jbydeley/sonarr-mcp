import { z } from 'zod';

export const LogRecordSchema = z.object({
  id: z.number(),
  time: z.string().datetime(),
  exception: z.string(),
  exceptionType: z.string(),
  level: z.string(),
  logger: z.string(),
  message: z.string(),
  method: z.string(),
});

export type LogRecord = z.infer<typeof LogRecordSchema>;
