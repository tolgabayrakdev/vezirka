export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Not found') {
    super(404, message);
  }
}
