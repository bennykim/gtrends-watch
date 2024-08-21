import fetch from "node-fetch";

import { ResponseError, TooManyRequestsError } from "../utils/errors";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleResponse = async (response) => {
  if (response.ok) {
    return await response.text();
  }
  if (response.status === 429) {
    throw TooManyRequestsError.create("Too many requests", response);
  }
  throw ResponseError.fromResponse(response);
};

const retryWithBackoff = async (fn, retries, backoffFactor) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.name === "TooManyRequestsError" && attempt < retries) {
        await sleep(backoffFactor * Math.pow(2, attempt));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Request failed after multiple attempts");
};

export const makeHttpRequest = async ({
  url,
  method,
  params,
  headers,
  timeout,
  retries,
  backoffFactor,
}) => {
  const urlObj = new URL(url);
  urlObj.search = new URLSearchParams(params).toString();

  const options = { method, headers, timeout };

  return retryWithBackoff(
    () => fetch(urlObj.toString(), options).then(handleResponse),
    retries,
    backoffFactor
  );
};
