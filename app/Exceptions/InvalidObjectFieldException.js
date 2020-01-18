'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidObjectFieldException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = InvalidObjectFieldException
