import fetchMock from "jest-fetch-mock";

import { makeHttpRequest } from "../src/api/httpClient";

describe("Google Trends API", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe("makeHttpRequest", () => {
    it("should make a successful request", async () => {
      fetchMock.mockResponseOnce("Success");

      const result = await makeHttpRequest({
        url: "https://example.com",
        method: "GET",
        params: { key: "value" },
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
        retries: 3,
        backoffFactor: 300,
      });

      expect(result).toBe("Success");
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://example.com/?key=value",
        expect.objectContaining({
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    it("should retry on TooManyRequestsError", async () => {
      fetchMock
        .mockResponseOnce(JSON.stringify({}), { status: 429 })
        .mockResponseOnce("Success");

      const result = await makeHttpRequest({
        url: "https://example.com",
        method: "GET",
        params: {},
        headers: {},
        timeout: 5000,
        retries: 3,
        backoffFactor: 300,
      });

      expect(result).toBe("Success");
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("should throw TooManyRequestsError after max retries", async () => {
      fetchMock.mockResponse(JSON.stringify({}), { status: 429 });

      await expect(
        makeHttpRequest({
          url: "https://example.com",
          method: "GET",
          params: {},
          headers: {},
          timeout: 5000,
          retries: 3,
          backoffFactor: 300,
        })
      ).rejects.toThrow("Too many requests");

      expect(fetchMock).toHaveBeenCalledTimes(4);
    });

    it("should throw ResponseError on non-200 status", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

      await expect(
        makeHttpRequest({
          url: "https://example.com",
          method: "GET",
          params: {},
          headers: {},
          timeout: 5000,
          retries: 3,
          backoffFactor: 300,
        })
      ).rejects.toThrow(
        "The request failed: Google returned a response with code 404"
      );
    });
  });
});
