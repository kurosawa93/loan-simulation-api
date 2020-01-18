'use strict'

const { test, before } = use('Test/Suite')('Class Transformer Test')
const BorrowerProfile = use('App/Models/BorrowerProfile')
const LoanDetail = use('App/Models/LoanDetail')
const Database = use('Database')

before(async () => {
    await Database.raw('TRUNCATE TABLE borrower_profiles, loan_details CASCADE')

    const borrowerObj = BorrowerProfile.transformJsonToObject({
        fullName: 'Rachmat Priambudi',
        gender: 'Male',
        dateOfBirth: '19/04/1993',
        addresses: 'Jl. Sukabirus F20-01-02-Sukabirus-Dayeuhkolot-Kab.Bandung-Indonesia',
        identityCard: 'KTP-000000000001',
        npwp: '0010000001',
        residentalStatus: 'permanent',
        hasOccupations: true,
        occupations: 'Karyawan-permanent',
        collectibilityStatus: 1,
        monthlyExpense: 300000
    })
    await borrowerObj.save()
    
    const loan1 = LoanDetail.transformJsonToObject({
        loanPeriod: 12,
        loanAmount: 6000000
    })
    await loan1.save()
    loan1.borrower().associate(borrowerObj)

    const borrowerObj2 = BorrowerProfile.transformJsonToObject({
        fullName: 'Rachmat Priambudi 2',
        gender: 'Male',
        dateOfBirth: '19/04/1994',
        addresses: 'Jl. Sukabirus F20-01-02-Sukabirus-Dayeuhkolot-Kab.Bandung-Indonesia',
        identityCard: 'KTP-000000000001',
        npwp: '0010000001',
        residentalStatus: 'rent',
        hasOccupations: false,
        occupations: 'contract-000000',
        collectibilityStatus: 4,
        monthlyExpense: 2500000
    })
    await borrowerObj2.save()

    const loan2 = LoanDetail.transformJsonToObject({
        loanPeriod: 3,
        loanAmount: 2000000
    })
    await loan2.save()
    loan2.borrower().associate(borrowerObj2)

    const borrowerObj3 = BorrowerProfile.transformJsonToObject({
        fullName: 'Rachmat Priambudi 3',
        gender: 'Male',
        dateOfBirth: '19/04/1995',
        addresses: 'Jl. Sukabirus F20-01-02-Sukabirus-Dayeuhkolot-Kab.Bandung-Indonesia',
        identityCard: 'KTP-000000000003',
        npwp: '0010000001',
        residentalStatus: 'rent',
        hasOccupations: true,
        occupations: 'Karyawan-permanent',
        collectibilityStatus: 2,
        monthlyExpense: 750000
    })
    await borrowerObj3.save()

    const loan3 = LoanDetail.transformJsonToObject({
        loanPeriod: 24,
        loanAmount: 3000000
    })
    await loan3.save()
    loan3.borrower().associate(borrowerObj3)
})

test('test all aggregated value in BorrowerProfile', async ({ assert }) => {
    const maxMonthlyExpense = await BorrowerProfile.getMaxMonthlyExpense()
    const maxResidentalStatus = await BorrowerProfile.getMaxResidentalStatus()
    const maxHasOccupations = await BorrowerProfile.getMaxHasOccupations()
    const minCollectibilityStatus = await BorrowerProfile.getMinCollectibilityStatus()

    assert.isTrue(maxMonthlyExpense === 2500000)
    assert.isTrue(maxResidentalStatus === 100)
    assert.isTrue(maxHasOccupations === 100)
    assert.isTrue(minCollectibilityStatus === 1)
})

test('evaluate profile with score > 0.5', async ({assert}) => {
    const borrowerObj = await BorrowerProfile.first()
    await borrowerObj.evaluateProfile()
    
    assert.isTrue(borrowerObj.profile_score > 0.5)
})

test('evaluate profile with score < 0.5', async ({assert}) => {
    const borrowerObj = await BorrowerProfile.findBy('full_name', 'Rachmat Priambudi 2')
    await borrowerObj.evaluateProfile()
    assert.isTrue(borrowerObj.profile_score < 0.5)
})

test('evaluate profile and loan status', async ({assert}) => {
    let rejected = 0
    let approved = 0
    const borrowers = await BorrowerProfile.all()
    for (const borrower of borrowers.rows) {
        await borrower.evaluateProfile()
        const loans = await borrower.loans().fetch()
        for (const loan of loans.rows) {
            await loan.calculateLoanStatus(borrower.profile_score)
            if (loan.loan_status === 'approved') 
                approved++
            else if (loan.loan_status === 'rejected')
                rejected++
        }
    }

    assert.isTrue(rejected === 1)
    assert.isTrue(approved === 2)
})