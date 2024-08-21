import fetch from "node-fetch";

import { API_BASE_URL } from "./constants";

export const getCookie = async () => {
  const options = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  };

  const response = await fetch(`${API_BASE_URL}/trends/explore`, options);
  const cookies = response.headers.get("set-cookie");

  if (!cookies) {
    throw new Error("No cookies received");
  }

  const nidCookie = cookies
    .split(", ")
    .find((cookie) => cookie.startsWith("NID="));
  if (!nidCookie) {
    throw new Error("NID cookie not found");
  }

  return nidCookie.split(";")[0];
};
