class CustomException extends Error {
  name;
  message;
  statusCode;

  constructor(message, statusCode = 500) {
    super(message);

    this.success = false;
    this.name = 'CustomException';
    this.message = message;
    this.statusCode = statusCode;
  }
}
class BadRequestException extends CustomException {
  constructor(message) {
    super(message);

    this.name = 'UnauthorizedException';
    this.statusCode = 400;
  }
}

class ForbiddenException extends CustomException {
  constructor(message) {
    super(message);

    this.name = 'ForbiddenException';
    this.statusCode = 403;
  }
}
class ConflictException extends CustomException {
  constructor(message) {
    super(message);

    this.name = 'ConflictException';
    this.statusCode = 409;
  }
}
class NotFoundException extends CustomException {
  constructor(message) {
    super(message);

    this.name = 'NotFoundException';
    this.statusCode = 404;
  }
}
class UnauthorizedException extends CustomException {
  constructor(message) {
    super(message);

    this.name = 'UnauthorizedException';
    this.statusCode = 401;
  }
}
class UnkownException extends CustomException {
  constructor(message) {
    super(message);

    this.name = 'UnkownException';
    this.statusCode = 500;
  }
}

export {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
};
