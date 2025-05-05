export class TvdbIdVo {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(`TVDB ID must be a positive integer: ${value}`);
    }

    this.value = value;
  }

  get raw() {
    return this.value;
  }
}
