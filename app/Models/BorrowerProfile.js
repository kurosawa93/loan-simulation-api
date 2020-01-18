'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Event = use('Event')
const ScoringCalculation = use('App/Utils/ScoringCalculation')

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

    loans() {
        return this.hasMany('App/Models/LoanDetail')
    }

    static async getMinCollectibilityStatus() {
        const { collectibility_status } = await BorrowerProfile.query().select('collectibility_status').orderBy('collectibility_status', 'asc').first()
        return Number(collectibility_status)
    }

    static async getMaxMonthlyExpense() {
        const { monthly_expense } = await BorrowerProfile.query().select('monthly_expense').orderBy('monthly_expense', 'desc').first()
        return Number(monthly_expense)
    }

    static async getMaxResidentalStatus() {
        const { residental_status } = await BorrowerProfile.query().select('residental_status').orderBy('residental_status', 'asc').first()
        if (residental_status === 'permanent') 
            return 100
        return 1
    }

    static async getMaxHasOccupations() {
        const { has_occupations } = await BorrowerProfile.query().select('has_occupations').orderBy('has_occupations', 'desc').first()
        if (has_occupations)
            return 100
        return 1
    }

    async calculateCollectabilityCriterion() {
        const minCollectibility = await BorrowerProfile.getMinCollectibilityStatus()
        const normalCollectibility = ScoringCalculation.calculateNormalMinValue(this.collectibility_status, minCollectibility)
        return ScoringCalculation.calculateCriterionValue(normalCollectibility, 'collectability_status')
    }

    async calculateMonthlyExpenseCriterion() {
        const maxMonthlyExpense = await BorrowerProfile.getMaxMonthlyExpense()
        const benefitMonthly = ScoringCalculation.calculateBenefitMaxValue(this.monthly_expense, maxMonthlyExpense)
        return ScoringCalculation.calculateCriterionValue(benefitMonthly, 'monthly_expense')
    }

    async calculateResidentalCriterion() {
        const maxResidental = await BorrowerProfile.getMaxResidentalStatus()
        const residentalValue = this.residental_status ? 100 : 1
        const benefitResidental = ScoringCalculation.calculateBenefitMaxValue(residentalValue, maxResidental)
        return ScoringCalculation.calculateCriterionValue(benefitResidental, 'residental_status')
    }

    async calculateHasOccupationCriterion() {
        const maxOccupation = await BorrowerProfile.getMaxHasOccupations()
        const occupationValue = this.has_occupations ? 100 : 1
        const benefitOccupation = ScoringCalculation.calculateBenefitMaxValue(occupationValue, maxOccupation)
        return ScoringCalculation.calculateCriterionValue(benefitOccupation, 'has_occupations')
    }

    async evaluateProfile() {
        const collectabilityCriterion = await this.calculateCollectabilityCriterion()
        const monthlyCriterion = await this.calculateMonthlyExpenseCriterion()
        const residentalCriterion = await this.calculateResidentalCriterion()
        const occupationCriterion = await this.calculateHasOccupationCriterion()
        const overallScore = collectabilityCriterion + monthlyCriterion + residentalCriterion + occupationCriterion

        this.profile_score = overallScore
        await this.save()
        Event.fire('update::borrowerScoring', this)
        return
    }
}

module.exports = BorrowerProfile
