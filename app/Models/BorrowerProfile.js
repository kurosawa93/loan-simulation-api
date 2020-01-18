'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BorrowerProfile extends Model {
    static transformJsonToObject(rawData) {
        const columns = {
            fullName: 'full_name',
            gender: 'gender',
            dateOfBirth: 'date_of_birth',
            addresses: 'addresses',
            identityCard: 'identity_card',
            npwp: 'npwp',
            residentalStatus: 'residental_status',
            hasOccupations: 'has_occupations',
            occupation: 'occupation',
            collectabilityStatus: 'collectability_status',
            monthlyExpense: 'monthly_expense'
        }

        const object = new BorrowerProfile()
        for (const key in rawData) {
            object[columns[key]] = rawData[key]
        }
        return object
    }
}

module.exports = BorrowerProfile
