'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BorrowerProfilesAddScoreSchema extends Schema {
  up () {
    this.table('borrower_profiles', (table) => {
      // alter table
      table.decimal('profile_score')
    })
  }

  down () {
    this.table('borrower_profiles_add_scores', (table) => {
      // reverse alternations
      table.dropColumn('profile_score')
    })
  }
}

module.exports = BorrowerProfilesAddScoreSchema
