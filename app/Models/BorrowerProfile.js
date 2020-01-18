'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ObjectFieldValidator = use('App/Utils/ObjectFieldValidator')

class BorrowerProfile extends Model {
    static boot() {
        super.boot()
        this.addTrait('CommonBaseModel', {
            columns: {
                fullName: 'full_name',
                gender: 'gender',
                dateOfBirth: 'date_of_birth',
                addresses: 'addresses',
                identityCard: 'identity_card',
                npwp: 'npwp',
                residentalStatus: 'residental_status',
                hasOccupations: 'has_occupations',
                occupations: 'occupations',
                collectibilityStatus: 'collectibility_status',
                monthlyExpense: 'monthly_expense'
            }
        })
    }

    static async getMaxMonthlyExpense() {
        const { monthly_expense } = await BorrowerProfile.query().select('monthly_expense').orderBy('monthly_expense', 'desc').first()
        return monthly_expense
    }
}

module.exports = BorrowerProfile
