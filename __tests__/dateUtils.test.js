import { formatDate, isLessThan7Days } from "../src/utils/dateUtils";

describe("isLessThan7Days", () => {
  test("returns true for dates less than 7 days apart", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-01-06");
    expect(isLessThan7Days(date1, date2)).toBe(true);
  });

  test("returns false for dates 7 or more days apart", () => {
    const date1 = new Date("2023-01-01");
    const date2 = new Date("2023-01-08");
    expect(isLessThan7Days(date1, date2)).toBe(false);

    const date3 = new Date("2023-01-15");
    expect(isLessThan7Days(date1, date3)).toBe(false);
  });
});

describe("formatDate", () => {
  test("formats date without time", () => {
    const date = new Date("2023-05-15T10:30:00Z");
    expect(formatDate(date)).toBe("2023-05-15");
  });

  test("formats date with time", () => {
    const date = new Date("2023-05-15T10:30:00Z");
    expect(formatDate(date, true)).toBe("2023-05-15T10:30:00");
  });

  test("formats date without dashes", () => {
    const date = new Date("2023-05-15T10:30:00Z");
    expect(formatDate(date, false, true)).toBe("20230515");
  });

  test("formats date with time and without dashes", () => {
    const date = new Date("2023-05-15T10:30:00Z");
    expect(formatDate(date, true, true)).toBe("20230515T10:30:00");
  });
});
