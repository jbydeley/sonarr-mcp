import type { QualityRepository } from "../ports/quality.repository.js";
import type { QualityProfile } from "../entities/quality-profile.entity.js";

export class ListQualitiesUseCase {
  constructor(
    private readonly qualityRepository: Pick<
      QualityRepository,
      "getQualityProfiles"
    >
  ) {}

  async execute(): Promise<QualityProfile[]> {
    return this.qualityRepository.getQualityProfiles();
  }
}
