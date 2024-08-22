import { createGoogleTrendsAPI } from "./api";
import { SEARCH_TYPE } from "./constants";

const googleTrendsAPI = createGoogleTrendsAPI();

export default {
  getAutoCompleteSuggestions: (options) =>
    googleTrendsAPI.makeRequest(SEARCH_TYPE.AUTO_COMPLETE, options),
  getDailyTrendingSearches: (options) =>
    googleTrendsAPI.makeRequest(SEARCH_TYPE.DAILY_TRENDS, options),
  getInterestByGeography: (options) =>
    googleTrendsAPI.makeRequest(SEARCH_TYPE.INTEREST_BY_REGION, options),
  getInterestOverTime: (options) =>
    googleTrendsAPI.makeRequest(SEARCH_TYPE.INTEREST_OVER_TIME, options),
  getRealTimeTrendingSearches: (options) =>
    googleTrendsAPI.makeRequest(SEARCH_TYPE.REAL_TIME_TRENDS, options),
  getRelatedQueries: (options) =>
    googleTrendsAPI.makeRequest(SEARCH_TYPE.RELATED_QUERIES, options),
  getRelatedTopics: (options) =>
    googleTrendsAPI.makeRequest(SEARCH_TYPE.RELATED_TOPICS, options),
};
