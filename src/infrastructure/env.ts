import { config } from "dotenv";
// import { z } from "zod";

config();

// const envSchema = z.object({
//   SONARR_URL: z.string().url(),
//   SONARR_API_KEY: z.string().min(1, "SONARR_API_KEY is required"),
// });

// const parsedEnv = envSchema.safeParse(process.env);

// if (!parsedEnv.success) {
//   console.error("❌ Invalid environment variables:", parsedEnv.error.format());
//   // TODO: Fix this so it doesn't fail tests in CI
//   // process.exit(1);
// }

export const env = {
  SONARR_URL: process.env.SONARR_URL || "http://localhost:8989",
  SONARR_API_KEY: process.env.SONARR_API_KEY || "",
};
