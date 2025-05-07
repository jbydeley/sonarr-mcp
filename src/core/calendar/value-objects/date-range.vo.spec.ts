import { describe, it, expect, vi } from "vitest";
import { DateRangeVO } from "./date-range.vo.js";

describe("DateRangeVO", () => {
  it("should create a date range", () => {
    const dateRange = new DateRangeVO(new Date(), new Date());

    expect(dateRange.start).toBeInstanceOf(Date);
    expect(dateRange.end).toBeInstanceOf(Date);
  });

  it("should throw an error if the start date is after the end date", () => {
    const start = new Date();
    const end = new Date(start.getTime() + 1);

    expect(() => new DateRangeVO(end, start)).toThrow(
      "Start date must be before end date"
    );
  });
});
