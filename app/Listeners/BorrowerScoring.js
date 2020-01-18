'use strict'

const BorrowerScoring = exports = module.exports = {}

BorrowerScoring.updatedScoring = async (borrower) => {
    const loanDetails = await borrower.loans().fetch()
    for (const loanDetail of loanDetails.rows) {
        await loanDetail.calculateLoanStatus(borrower.profile_score)
    }
}
