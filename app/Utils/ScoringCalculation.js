'use strict'

class ScoringCalculation {
    static calculateNormalMinValue(value, fieldMinValue) {
        const normValue = fieldMinValue / value
        return normValue

    }

    static calculateBenefitMaxValue(value, fieldMaxValue) {
        const benefitValue = value / fieldMaxValue
        return benefitValue
    }

    static calculateCriterionValue(value, criterionName) {
        const criterion = {
            collectability_status: 0.4,
            has_occupations: 0.3,
            monthly_expense: 0.15,
            residental_status: 0.15
        }
        const criterionValue = value * criterion[criterionName]
        return criterionValue
    }

    static calculateLoanStatus(loanAmount, loanPeriod, score) {
        const criterions = [
            {
                amountRange: [1000000, 2500000],
                duration: '<=12',
                minimumScore: 0.4
            },
            {
                amountRange: [1000000, 2500000],
                duration: '>12',
                minimumScore: 0.5
            },
            {
                amountRange: [2500001, 5000000],
                duration: '<=12',
                minimumScore: 0.6
            },
            {
                amountRange: [2500001, 5000000],
                duration: '>12',
                minimumScore: 0.7
            },
            {
                amountRange: [5000001, 10000000],
                duration: '<=12',
                minimumScore: 0.8
            },
            {
                amountRange: [5000001, 10000000],
                duration: '>12',
                minimumScore: 0.9
            }
        ]
        
        for (const criterion of criterions) {
            if (loanAmount > criterion.amountRange[0] && loanAmount < criterion.amountRange[1]) {
                const duration = criterion.duration.includes('<=')
                if (duration) {
                    if (loanPeriod <= 12 && score > criterion.minimumScore) 
                        return 'approved'
                }
                else {
                    if (loanPeriod > 12 && score > criterion.minimumScore)
                        return 'approved'
                }
            }
        }
        return 'rejected'
    }
}

module.exports = ScoringCalculation