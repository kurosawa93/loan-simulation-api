'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LoanDetail extends Model {
    static boot() {
        super.boot()
        this.addTrait('CommonBaseModel', {
            columns: {
                loanPeriod: 'loan_period',
                loanAmount: 'loan_amount'
            }
        })
    }
}

module.exports = LoanDetail
