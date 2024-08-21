const createResponseError = (message, response) => {
  const error = new Error(message);
  error.name = "ResponseError";
  error.response = response;
  return error;
};

const createTooManyRequestsError = (message, response) => {
  const error = createResponseError(message, response);
  error.name = "TooManyRequestsError";
  return error;
};

const fromResponse = (response) => {
  return createResponseError(
    `The request failed: Google returned a response with code ${response.status}`,
    response
  );
};

export const ResponseError = {
  create: createResponseError,
  fromResponse,
};

export const TooManyRequestsError = {
  create: createTooManyRequestsError,
};
