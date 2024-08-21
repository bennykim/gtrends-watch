import { SEARCH_TYPE } from "../src/constants";
import { formatDate, isLessThan7Days } from "./dateUtils";

export const validateAndPrepareOptions = (options, searchType) => {
  if (typeof options !== "object" || Array.isArray(options)) {
    throw new Error("Options must be an object");
  }

  const defaultOptions = {
    hl: "en-US",
    category: 0,
    property: "",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  if (searchType === SEARCH_TYPE.INTEREST_OVER_TIME) {
    validateTimeOptions(mergedOptions);
  }

  if (searchType.includes("TRENDS") && !mergedOptions.geo) {
    throw new Error("Geo must be provided for trend searches");
  }

  return mergedOptions;
};

const validateTimeOptions = (options) => {
  if (!options.startTime) options.startTime = new Date("2004-01-01");
  if (!options.endTime) options.endTime = new Date();

  if (
    !(options.startTime instanceof Date) ||
    !(options.endTime instanceof Date)
  ) {
    throw new Error("Start time and end time must be Date objects");
  }

  if (options.startTime > options.endTime) {
    [options.startTime, options.endTime] = [options.endTime, options.startTime];
  }

  const includeTime = isLessThan7Days(options.startTime, options.endTime);
  options.time = `${formatDate(options.startTime, includeTime)} ${formatDate(
    options.endTime,
    includeTime
  )}`;
};

export const parseResults = (results) => {
  try {
    const cleanedResults = results.startsWith(")]}'")
      ? results.substr(4)
      : results;

    const parsedResults = JSON.parse(cleanedResults);

    if (parsedResults && parsedResults.widgets) {
      return parsedResults.widgets;
    } else if (Array.isArray(parsedResults)) {
      return parsedResults;
    } else {
      return parsedResults;
    }
  } catch (e) {
    console.error("Error parsing results:", e);
    console.error("Raw results:", results);
    throw new Error("Failed to parse API response");
  }
};

export const formatComparisonItems = (options) => {
  const { keyword, geo } = options;
  const isMultiRegion = Array.isArray(geo);
  const isMultiKeyword = Array.isArray(keyword);

  if (isMultiRegion && !isMultiKeyword) {
    return geo.map((region) => ({
      ...options,
      geo: region,
    }));
  }

  if (isMultiKeyword) {
    return options.keyword.map((kw, index) => ({
      ...options,
      keyword: kw,
      geo: isMultiRegion ? geo[index] : options.geo,
    }));
  }

  return [options];
};

export const formatResolution = (resolution = "") => {
  const validResolutions = ["COUNTRY", "REGION", "CITY", "DMA"];
  const upperResolution = resolution.toUpperCase();
  return validResolutions.includes(upperResolution) ? upperResolution : "";
};
