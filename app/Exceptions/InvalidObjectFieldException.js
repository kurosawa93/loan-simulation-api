'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidObjectFieldException extends LogicalException {
  constructor(message, status, code) {
    super(message, status, code)
  }

  handle(error, { response }) {
    return response.status(error.code).send({
        data: null,
        meta: {
            message: error.message
        }
    })
  }
}

module.exports = InvalidObjectFieldException
