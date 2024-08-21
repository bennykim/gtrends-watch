import { formatDate, isLessThan7Days } from "../src/dateUtils";
import {
  formatComparisonItems,
  formatResolution,
  parseResults,
  validateAndPrepareOptions,
} from "../src/utils";

jest.mock("../src/dateUtils", () => ({
  formatDate: jest.fn(),
  isLessThan7Days: jest.fn(),
}));

describe("validateAndPrepareOptions", () => {
  test("throws error if options is not an object", () => {
    expect(() =>
      validateAndPrepareOptions("not an object", "INTEREST_OVER_TIME")
    ).toThrow("Options must be an object");
  });

  test("merges default options", () => {
    const result = validateAndPrepareOptions({}, "INTEREST_OVER_TIME");
    expect(result).toEqual(
      expect.objectContaining({
        hl: "en-US",
        category: 0,
        property: "",
      })
    );
  });

  test("throws error if geo is not provided for trend searches", () => {
    expect(() => validateAndPrepareOptions({}, "TRENDS")).toThrow(
      "Geo must be provided for trend searches"
    );
  });

  test("validates time options for INTEREST_OVER_TIME", () => {
    isLessThan7Days.mockReturnValue(false);
    formatDate.mockReturnValue("2023-01-01");
    const options = {
      startTime: new Date("2023-01-01"),
      endTime: new Date("2023-01-10"),
    };
    const result = validateAndPrepareOptions(options, "INTEREST_OVER_TIME");
    expect(result.time).toBeDefined();
  });
});

describe("parseResults", () => {
  test("parses valid JSON results", () => {
    const mockResults = ')]}\'\n{"widgets": [{"data": "test"}]}';
    expect(parseResults(mockResults)).toEqual([{ data: "test" }]);
  });

  test("throws error for invalid JSON", () => {
    const mockResults = ')]}\'\n{"invalid": "json"';
    expect(() => parseResults(mockResults)).toThrow();
  });
});

describe("formatComparisonItems", () => {
  test("handles single keyword and geo", () => {
    const input = { keyword: "test", geo: "US" };
    expect(formatComparisonItems(input)).toEqual([input]);
  });

  test("handles multiple keywords and single geo", () => {
    const input = { keyword: ["test1", "test2"], geo: "US" };
    const expected = [
      { keyword: "test1", geo: "US" },
      { keyword: "test2", geo: "US" },
    ];
    expect(formatComparisonItems(input)).toEqual(expected);
  });

  test("handles single keyword and multiple geos", () => {
    const input = { keyword: "test", geo: ["US", "GB"] };
    const expected = [
      { keyword: "test", geo: "US" },
      { keyword: "test", geo: "GB" },
    ];
    expect(formatComparisonItems(input)).toEqual(expected);
  });
});

describe("formatResolution", () => {
  test("returns uppercase valid resolution", () => {
    expect(formatResolution("country")).toBe("COUNTRY");
  });

  test("returns empty string for invalid resolution", () => {
    expect(formatResolution("invalid")).toBe("");
  });
});
