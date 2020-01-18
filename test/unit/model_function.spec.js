'use strict'

const { test } = use('Test/Suite')('Class Transformer Test')
const BorrowerProfile = use('App/Models/BorrowerProfile')
const LoanDetail = use('App/Models/LoanDetail')

test('make sure BorrowerProfile transformers work as intended', async ({ assert }) => {
  const borrowerObj = BorrowerProfile.transformJsonToObject({
    fullName: 'Rachmat Priambudi',
    gender: 'Male',
    dateOfBirth: '19/04/1993',
    addresses: 'Perumnas Bumi Teluk Jambe',
    identityCard: 'KTP',
    npwp: '0010000001',
    residentalStatus: 'permanent',
    hasOccupations: true,
    occupation: 'Karyawan',
    collectabilityStatus: 3,
    monthlyExpense: 300000
  })

  assert.isTrue(borrowerObj['full_name'] == 'Rachmat Priambudi')
  assert.isTrue(borrowerObj['gender'] == 'Male')
  assert.isTrue(borrowerObj['date_of_birth'] == '19/04/1993')
  assert.isTrue(borrowerObj['addresses'] == 'Perumnas Bumi Teluk Jambe')
  assert.isTrue(borrowerObj['identity_card'] == 'KTP')
  assert.isTrue(borrowerObj['residental_status'] == 'permanent')
  assert.isTrue(borrowerObj['has_occupations'])
  assert.isTrue(borrowerObj['occupation'] == 'Karyawan')
  assert.isTrue(borrowerObj['collectability_status'] == 3)
  assert.isTrue(borrowerObj['monthly_expense'] == 300000)
})

test('make sure LoanDetail transformers work as intended', async ({ assert }) => {
  const loanObj = LoanDetail.transformJsonToObject({
    loanAmount: 300000,
    loanPeriod: 12,
  })

  assert.isTrue(loanObj['loan_amount'] == 300000)
  assert.isTrue(loanObj['loan_period'] == 12)
})
