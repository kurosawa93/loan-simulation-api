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
      table.string('residentalStatus')
      table.boolean('hasOccupations')
      table.string('occupation')
      table.integer('collectibilityStatus')
      table.decimal('monthly_expenses')
      table.timestamps()
    })
  }

  down () {
    this.drop('borrower_profiles')
  }
}

module.exports = BorrowerProfileSchema
