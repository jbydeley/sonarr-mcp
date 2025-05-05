import type { QualityProfile } from "../entities/quality-profile.entity.js";

export interface QualityRepository {
  getQualityProfiles(): Promise<QualityProfile[]>;
}
