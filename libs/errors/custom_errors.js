const { BaseError } = require('make-error-cause');
const errors = require('./errors');

class CustomError extends BaseError {
    constructor(msg, cause, unknown) {
        const { type, code, message } = errors.has(msg)
            ? {
                  type: msg,
                  ...errors.get(msg)
              }
            : {
                  type: unknown,
                  ...errors.get(unknown)
              };
        super(message, cause);
        Object.defineProperty(this, 'type', {
            configurable: false,
            enumerable: true,
            value: type,
            writable: false
        });
        Object.defineProperty(this, 'code', {
            configurable: false,
            enumerable: true,
            value: code,
            writable: false
        });
    }
}

class OkError extends CustomError {
    constructor(msg, cause) {
        super(msg, cause, 'OK_ERROR_UNKNOWN');
    }
}

class FkError extends CustomError {
    constructor(msg, cause) {
        super(msg, cause, 'FK_ERROR_UNKNOWN');
    }
}

class ApiError extends CustomError {
    constructor(msg, cause) {
        super(msg, cause, 'API_ERROR_UNKNOWN');
    }
}

class VkError extends CustomError {
    constructor(msg, cause) {
        super(msg, cause, 'VK_ERROR_UNKNOWN');
        Object.defineProperty(this, 'critical', {
            configurable: false,
            enumerable: true,
            value: errors.has(msg)
                ? errors.get(msg).critical
                : errors.get('VK_ERROR_UNKNOWN').critical,
            writable: false
        });
    }
}

const vkError = (message, cause) => new VkError(message, cause);
const okError = (message, cause) => new OkError(message, cause);
const fkError = (message, cause) => new FkError(message, cause);
const apiError = (message, cause) => new ApiError(message, cause);

module.exports = {
    vkError,
    okError,
    apiError,
    fkError
};
