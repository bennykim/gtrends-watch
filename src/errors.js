export class ResponseError extends Error {
  constructor(message, response) {
    super(message);
    this.name = "ResponseError";
    this.response = response;
  }

  static fromResponse(response) {
    return new ResponseError(
      `The request failed: Google returned a response with code ${response.statusCode}`,
      response
    );
  }
}

export class TooManyRequestsError extends ResponseError {
  constructor(message, response) {
    super(message, response);
    this.name = "TooManyRequestsError";
  }
}
