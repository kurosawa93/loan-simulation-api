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
    console.log(borrowerObj.profile_score)
    assert.isTrue(borrowerObj.profile_score > 0.5)
})

test('evaluate profile with score < 0.5', async ({assert}) => {
    const borrowerObj = await BorrowerProfile.findBy('full_name', 'Rachmat Priambudi 2')
    await borrowerObj.evaluateProfile()
    console.log(borrowerObj.profile_score)
    assert.isTrue(borrowerObj.profile_score < 0.5)
})