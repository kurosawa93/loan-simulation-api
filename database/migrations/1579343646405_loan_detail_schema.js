'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanDetailSchema extends Schema {
  up () {
    this.create('loan_details', (table) => {
      table.increments()
      table.integer('borrower_profile_id').unsigned().references('id').inTable('borrower_profiles').onDelete('cascade').index()
      table.decimal('loan_amount')
      table.integer('loan_period')
      table.decimal('loan_score')
      table.string('loan_status')
      table.timestamps()
    })
  }

  down () {
    this.drop('loan_details')
  }
}

module.exports = LoanDetailSchema
