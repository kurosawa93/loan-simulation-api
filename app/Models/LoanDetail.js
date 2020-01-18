'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LoanDetail extends Model {
    static transformJsonToObject(objectData) {
        const columns = {
            loanPeriod: 'loan_period',
            loanAmount: 'loan_amount'
        }

        const object = new LoanDetail()
        for (const key in objectData) {
            object[columns[key]] = objectData[key]
        }
        return object
    }
}

module.exports = LoanDetail
