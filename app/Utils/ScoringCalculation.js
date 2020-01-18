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
}

module.exports = ScoringCalculation