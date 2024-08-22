export const API_BASE_URL = "https://trends.google.com";

export const ENDPOINTS = {
  EXPLORE: "/trends/api/explore",
  INTEREST_OVER_TIME: "/trends/api/widgetdata/multiline",
  INTEREST_BY_REGION: "/trends/api/widgetdata/comparedgeo",
  RELATED_QUERIES: "/trends/api/widgetdata/relatedsearches",
  RELATED_TOPICS: "/trends/api/widgetdata/relatedsearches",
  SUGGESTIONS: "/trends/api/autocomplete/",
  TODAY_SEARCHES: "/trends/api/dailytrends",
  REALTIME_TRENDING_SEARCHES: "/trends/api/realtimetrends",
};

export const SEARCH_TYPE = {
  AUTO_COMPLETE: "AUTO_COMPLETE",
  DAILY_TRENDS: "DAILY_TRENDS",
  INTEREST_BY_REGION: "INTEREST_BY_REGION",
  INTEREST_OVER_TIME: "INTEREST_OVER_TIME",
  REAL_TIME_TRENDS: "REAL_TIME_TRENDS",
  RELATED_QUERIES: "RELATED_QUERIES",
  RELATED_TOPICS: "RELATED_TOPICS",
};

export const WIDGET_IDS = {
  [SEARCH_TYPE.AUTO_COMPLETE]: "",
  [SEARCH_TYPE.INTEREST_OVER_TIME]: "TIMESERIES",
  [SEARCH_TYPE.INTEREST_BY_REGION]: "GEO_MAP",
  [SEARCH_TYPE.RELATED_TOPICS]: "RELATED_TOPICS",
  [SEARCH_TYPE.RELATED_QUERIES]: "RELATED_QUERIES",
};
