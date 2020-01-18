'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BorrowerProfileSchema extends Schema {
  up () {
    this.create('borrower_profiles', (table) => {
      table.increments()
      table.string('full_name')
      table.string('gender')
      table.string('date_of_birth')
      table.text('addresses')
      table.string('identity_card')
      table.string('npwp')
      table.string('residental_status')
      table.boolean('has_occupations')
      table.string('occupations')
      table.integer('collectibility_status')
      table.decimal('monthly_expense', null)
      table.timestamps()
    })
  }

  down () {
    this.drop('borrower_profiles')
  }
}

module.exports = BorrowerProfileSchema
