'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanDetailsRemoveScoreSchema extends Schema {
  up () {
    this.table('loan_details', (table) => {
      // alter table
      table.dropColumn('loan_score')
    })
  }

  down () {
    this.table('loan_details', (table) => {
      // reverse alternations
      table.decimal('loan_score')
    })
  }
}

module.exports = LoanDetailsRemoveScoreSchema
