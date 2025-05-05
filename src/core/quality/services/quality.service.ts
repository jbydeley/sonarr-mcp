import type { QualityRepository } from "../ports/quality.repository.js";
import type { QualityProfile } from "../entities/quality-profile.entity.js";
import { ListQualitiesUseCase } from "../use-cases/list-qualities.usecase.js";

export class QualityService {
  private readonly listQualitiesUseCase: ListQualitiesUseCase;

  constructor(
    qualityRepository: Pick<QualityRepository, "getQualityProfiles">
  ) {
    this.listQualitiesUseCase = new ListQualitiesUseCase(qualityRepository);
  }

  async listQualities(): Promise<QualityProfile[]> {
    return this.listQualitiesUseCase.execute();
  }
}
