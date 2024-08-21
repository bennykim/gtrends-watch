import { createGoogleTrendsAPI } from "../src/api";
import { SEARCH_TYPE, WIDGET_IDS } from "../src/constants";

import fetchMock from "jest-fetch-mock";

describe("Google Trends API", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe("createGoogleTrendsAPI", () => {
    let api;

    beforeEach(() => {
      api = createGoogleTrendsAPI();
    });

    it("should make a request successfully for INTEREST_OVER_TIME", async () => {
      const mockInitialResponse = JSON.stringify([
        { id: WIDGET_IDS.INTEREST_OVER_TIME, token: "token123", request: {} },
      ]);
      const mockWidgetResponse = JSON.stringify({ result: "success" });

      fetchMock
        .mockResponseOnce("", {
          headers: { "set-cookie": "NID=123; path=/; domain=.google.com" },
        })
        .mockResponseOnce(mockInitialResponse)
        .mockResponseOnce(mockWidgetResponse);

      const result = await api.makeRequest(SEARCH_TYPE.INTEREST_OVER_TIME, {
        keyword: "test",
      });
      expect(result).toEqual({ result: "success" });
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("should throw error when no relevant widget found", async () => {
      const mockInitialResponse = JSON.stringify([
        { id: "IRRELEVANT", token: "token123", request: {} },
      ]);

      fetchMock
        .mockResponseOnce("", {
          headers: { "set-cookie": "NID=123; path=/; domain=.google.com" },
        })
        .mockResponseOnce(mockInitialResponse);

      await expect(
        api.makeRequest(SEARCH_TYPE.INTEREST_OVER_TIME, { keyword: "test" })
      ).rejects.toThrow(
        `No relevant widget found for the search type: ${SEARCH_TYPE.INTEREST_OVER_TIME}`
      );
    });

    it("should make a request successfully for INTEREST_BY_REGION", async () => {
      const mockInitialResponse = JSON.stringify([
        { id: WIDGET_IDS.INTEREST_BY_REGION, token: "token123", request: {} },
      ]);
      const mockWidgetResponse = JSON.stringify({ result: "success" });

      fetchMock
        .mockResponseOnce("", {
          headers: { "set-cookie": "NID=123; path=/; domain=.google.com" },
        })
        .mockResponseOnce(mockInitialResponse)
        .mockResponseOnce(mockWidgetResponse);

      const result = await api.makeRequest(SEARCH_TYPE.INTEREST_BY_REGION, {
        keyword: "test",
      });
      expect(result).toEqual({ result: "success" });
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("should make a request successfully for RELATED_TOPICS", async () => {
      const mockInitialResponse = JSON.stringify([
        { id: WIDGET_IDS.RELATED_TOPICS, token: "token123", request: {} },
      ]);
      const mockWidgetResponse = JSON.stringify({ result: "success" });

      fetchMock
        .mockResponseOnce("", {
          headers: { "set-cookie": "NID=123; path=/; domain=.google.com" },
        })
        .mockResponseOnce(mockInitialResponse)
        .mockResponseOnce(mockWidgetResponse);

      const result = await api.makeRequest(SEARCH_TYPE.RELATED_TOPICS, {
        keyword: "test",
      });
      expect(result).toEqual({ result: "success" });
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("should make a request successfully for RELATED_QUERIES", async () => {
      const mockInitialResponse = JSON.stringify([
        { id: WIDGET_IDS.RELATED_QUERIES, token: "token123", request: {} },
      ]);
      const mockWidgetResponse = JSON.stringify({ result: "success" });

      fetchMock
        .mockResponseOnce("", {
          headers: { "set-cookie": "NID=123; path=/; domain=.google.com" },
        })
        .mockResponseOnce(mockInitialResponse)
        .mockResponseOnce(mockWidgetResponse);

      const result = await api.makeRequest(SEARCH_TYPE.RELATED_QUERIES, {
        keyword: "test",
      });
      expect(result).toEqual({ result: "success" });
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });
  });
});
