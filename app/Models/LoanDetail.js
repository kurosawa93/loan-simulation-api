'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ScoringCalculation = use('App/Utils/ScoringCalculation')

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

    async calculateLoanStatus(profileScore) {
        this.loan_status = ScoringCalculation.calculateLoanStatus(this.loan_amount, this.loan_period, profileScore)
        await this.save()
    }

    borrower() {
        return this.belongsTo('App/Models/BorrowerProfile')
    }
}

module.exports = LoanDetail
