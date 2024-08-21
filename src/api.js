import { API_BASE_URL, ENDPOINTS, WIDGET_IDS } from "./constants";
import { getCookie } from "./cookie";
import { makeHttpRequest } from "./httpClient";
import {
  formatComparisonItems,
  parseResults,
  validateAndPrepareOptions,
} from "./utils";

export const createGoogleTrendsAPI = (options = {}) => {
  const {
    hl = "en-US",
    tz = 360,
    geo = "",
    timeout = 5000,
    retries = 3,
    backoffFactor = 300,
  } = options;

  let cookies = null;

  const refreshCookieIfNeeded = async () => {
    if (!cookies) {
      cookies = await getCookie();
    }
  };

  const makeRequest = async (searchType, userOptions) => {
    await refreshCookieIfNeeded();

    const validatedOptions = validateAndPrepareOptions(userOptions, searchType);
    const initialResponse = await fetchInitialData(validatedOptions);
    const widget = findRelevantWidget(initialResponse, searchType);
    return fetchWidgetData(widget, validatedOptions);
  };

  const fetchInitialData = async (options) => {
    const response = await makeHttpRequest({
      url: `${API_BASE_URL}${ENDPOINTS.EXPLORE}`,
      method: "GET",
      params: {
        hl: options.hl || hl,
        req: JSON.stringify({
          comparisonItem: formatComparisonItems(options),
          category: options.category,
          property: options.property,
        }),
        tz: options.tz || tz,
      },
      headers: { Cookie: cookies },
      timeout,
      retries,
      backoffFactor,
    });
    return parseResults(response);
  };

  const findRelevantWidget = (parsedResults, searchType) => {
    const widget = parsedResults.find(({ id }) =>
      id.includes(WIDGET_IDS[searchType])
    );
    if (!widget) {
      throw new Error(
        `No relevant widget found for the search type: ${searchType}`
      );
    }
    return widget;
  };

  const fetchWidgetData = async (widget, options) => {
    const { token, request } = widget;
    const response = await makeHttpRequest({
      url: `${API_BASE_URL}${ENDPOINTS[widget.id]}`,
      method: "GET",
      params: {
        hl: options.hl || hl,
        req: JSON.stringify(request),
        token,
        tz: options.tz || tz,
      },
      headers: { Cookie: cookies },
      timeout,
      retries,
      backoffFactor,
    });
    return parseResults(response);
  };

  return { makeRequest };
};
