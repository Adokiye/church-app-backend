"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandling = exports.getErrorByStatusCode = exports.Deleted = exports.Unauthorized = exports.UnprocessableEntity = exports.InternalServerError = exports.BadRequest = exports.NotFound = void 0;

var _objection = require("objection");

var NotFound = function NotFound() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The requested resource could not be found';
  return {
    name: 'NotFound',
    message: message,
    statusCode: 404,
    errorCode: 404
  };
};

exports.NotFound = NotFound;

var BadRequest = function BadRequest() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The json data is malformed';
  return {
    name: 'BadRequest',
    message: message,
    statusCode: 400,
    errorCode: 400
  };
};

exports.BadRequest = BadRequest;

var InternalServerError = function InternalServerError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The API did something wrong';
  return {
    name: 'InternalServerError',
    message: message,
    statusCode: 500,
    errorCode: 500
  };
};

exports.InternalServerError = InternalServerError;

var UnprocessableEntity = function UnprocessableEntity(message) {
  return {
    name: 'Unprocessable Entity',
    message: message,
    statusCode: 422,
    errorCode: 422
  };
};

exports.UnprocessableEntity = UnprocessableEntity;

var Unauthorized = function Unauthorized() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Incorrect username or password';
  return {
    name: 'Unauthorized',
    message: message,
    statusCode: 401,
    errorCode: 401
  };
};

exports.Unauthorized = Unauthorized;

var Deleted = function Deleted() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Successfully deleted';
  return {
    name: 'Deleted',
    message: message,
    deleted: true,
    statusCode: 200,
    errorCode: 200
  };
};

exports.Deleted = Deleted;

var getErrorByStatusCode = function getErrorByStatusCode(statusCode) {
  switch (statusCode) {
    case 404:
      return NotFound;

    case 400:
      return BadRequest;

    case 500:
    default:
      return InternalServerError;

    case 401:
      return Unauthorized;
  }
};

exports.getErrorByStatusCode = getErrorByStatusCode;

var internalError = function internalError(err) {
  if (err.errorCode) {
    return err;
  }

  if (err.originalError) {
    return Unauthorized(err.originalError.message);
  }

  var errorLib = getErrorByStatusCode(err.statusCode || err.status || 500);
  return errorLib(err.message || err.toString());
};

var errorHandling = function errorHandling(err) {
  if (err.statusCode) {
    return internalError(err);
  }

  if (err instanceof _objection.UniqueViolationError) {
    return {
      type: err.name,
      message: "".concat(err.columns.toString().replace(/_/g, ' '), " already exist"),
      statusCode: 403
    };
  }

  if (err instanceof _objection.NotNullViolationError) {
    return {
      type: err.name,
      message: "".concat(err.column, " cannot be null"),
      statusCode: 400
    };
  }

  if (err instanceof _objection.ForeignKeyViolationError) {
    return {
      type: err.name,
      data: {
        table: err.table,
        constraint: err.constraint
      },
      statusCode: 409
    };
  }

  if (err instanceof _objection.CheckViolationError) {
    return {
      type: err.name,
      data: {
        table: err.table,
        constraint: err.constraint
      },
      statusCode: 400
    };
  }

  if (err instanceof _objection.DataError) {
    return {
      type: err.name,
      data: {},
      statusCode: 400
    };
  }

  if (err instanceof _objection.DBError) {
    return {
      type: 'UnknownDatabaseError',
      data: {
        message: err.message
      },
      statusCode: 500
    };
  }

  return {
    type: 'UnknownError',
    data: {
      message: err.message
    },
    statusCode: 500
  };
};

exports.errorHandling = errorHandling;
//# sourceMappingURL=errors.js.map