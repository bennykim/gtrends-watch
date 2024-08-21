import { getCookie } from "../src/cookie";

import fetchMock from "jest-fetch-mock";

describe("Google Trends API", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe("getCookie", () => {
    it("should return NID cookie", async () => {
      fetchMock.mockResponseOnce("", {
        headers: {
          "set-cookie": "NID=123; path=/; domain=.google.com, SIDCC=456;",
        },
      });

      const cookie = await getCookie();
      expect(cookie).toBe("NID=123");
    });

    it("should throw error when no cookies received", async () => {
      fetchMock.mockResponseOnce("", { headers: {} });

      await expect(getCookie()).rejects.toThrow("No cookies received");
    });

    it("should throw error when NID cookie not found", async () => {
      fetchMock.mockResponseOnce("", {
        headers: { "set-cookie": "OTHER=456; path=/; domain=.google.com" },
      });

      await expect(getCookie()).rejects.toThrow("NID cookie not found");
    });
  });
});
