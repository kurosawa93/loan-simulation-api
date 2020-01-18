'use strict'

const { test } = use('Test/Suite')('Class Transformer Test')
const BorrowerProfile = use('App/Models/BorrowerProfile')
const LoanDetail = use('App/Models/LoanDetail')

test('make sure BorrowerProfile transformers work as intended', async ({ assert }) => {
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
    collectibilityStatus: 3,
    monthlyExpense: 300000
  })

  assert.isTrue(borrowerObj['full_name'] == 'Rachmat Priambudi')
  assert.isTrue(borrowerObj['gender'] == 'Male')
  assert.isTrue(borrowerObj['date_of_birth'] == '19/04/1993')
  assert.isTrue(borrowerObj['addresses'] == 'Jl. Sukabirus F20-01-02-Sukabirus-Dayeuhkolot-Kab.Bandung-Indonesia')
  assert.isTrue(borrowerObj['identity_card'] == 'KTP-000000000001')
  assert.isTrue(borrowerObj['npwp'] == '0010000001')
  assert.isTrue(borrowerObj['residental_status'] == 'permanent')
  assert.isTrue(borrowerObj['has_occupations'])
  assert.isTrue(borrowerObj['occupations'] == 'Karyawan-permanent')
  assert.isTrue(borrowerObj['collectibility_status'] == 3)
  assert.isTrue(borrowerObj['monthly_expense'] == 300000)
})

test('create borrower profile with invalid gender', async ({ assert }) => {
  try {
    const borrowerObj = BorrowerProfile.transformJsonToObject({
      fullName: 'Rachmat Priambudi',
      gender: 'NotBoth',
      dateOfBirth: '19/04/1993',
      addresses: 'Perumnas Bumi Teluk Jambe',
      identityCard: 'KTP',
      npwp: '0010000001',
      residentalStatus: 'permanent',
      hasOccupations: true,
      occupations: 'Karyawan',
      collectabilityStatus: 3,
      monthlyExpense: 300000
    })
  }
  catch(error) {
    assert.isTrue(error.status === 'gender')
    assert.isTrue(error.code === 400)
  }
})

test('create borrower profile with invalid dateOfBirth, including rangeValidation method', async ({ assert }) => {
  try {
    const borrowerObj = BorrowerProfile.transformJsonToObject({
      fullName: 'Rachmat Priambudi',
      gender: 'Male',
      dateOfBirth: '19/04/2020',
      addresses: 'Perumnas Bumi Teluk Jambe',
      identityCard: 'KTP',
      npwp: '0010000001',
      residentalStatus: 'permanent',
      hasOccupations: true,
      occupations: 'Karyawan',
      collectibilityStatus: 3,
      monthlyExpense: 300000
    })
  }
  catch(error) {
    assert.isTrue(error.status === 'dateOfBirth')
    assert.isTrue(error.code === 400)
  }
})

test('create borrower profile with invalid addresses, including lengthValidation method', async ({ assert }) => {
  try {
    const borrowerObj = BorrowerProfile.transformJsonToObject({
      fullName: 'Rachmat Priambudi',
      gender: 'Male',
      dateOfBirth: '19/04/1993',
      addresses: 'Perumnas Bumi Teluk Jambe',
      identityCard: 'KTP',
      npwp: '0010000001',
      residentalStatus: 'permanent',
      hasOccupations: true,
      occupations: 'Karyawan',
      collectibilityStatus: 3,
      monthlyExpense: 300000
    })
  }
  catch(error) {
    assert.isTrue(error.status === 'addresses')
    assert.isTrue(error.code === 400)
  }
})

test('create borrower profile with invalid residentalStatus', async ({ assert }) => {
  try {
    const borrowerObj = BorrowerProfile.transformJsonToObject({
      fullName: 'Rachmat Priambudi',
      gender: 'Male',
      dateOfBirth: '19/04/1993',
      addresses: 'Jl. Sukabirus F20-01-02-Sukabirus-Dayeuhkolot-Kab.Bandung-Indonesia',
      identityCard: 'KTP-000000001',
      npwp: '0010000001',
      residentalStatus: 'not-permanent',
      hasOccupations: true,
      occupations: 'Karyawan-permanent',
      collectibilityStatus: 3,
      monthlyExpense: 300000
    })
  }
  catch(error) {
    assert.isTrue(error.status === 'residentalStatus')
    assert.isTrue(error.code === 400)
  }
})

test('create borrower profile with invalid collectabilityStatus, including dataTypeValidation method', async ({ assert }) => {
  try {
    const borrowerObj = BorrowerProfile.transformJsonToObject({
      fullName: 'Rachmat Priambudi',
      gender: 'Male',
      dateOfBirth: '19/04/1993',
      addresses: 'Jl. Sukabirus F20-01-02-Sukabirus-Dayeuhkolot-Kab.Bandung-Indonesia',
      identityCard: 'KTP-000000001',
      npwp: '0010000001',
      residentalStatus: 'permanent',
      hasOccupations: true,
      occupations: 'Karyawan-permanent',
      collectibilityStatus: '3',
      monthlyExpense: 300000
    })
  }
  catch(error) {
    assert.isTrue(error.status === 'collectabilityStatus')
    assert.isTrue(error.code === 400)
  }
})

test('make sure LoanDetail transformers work as intended', async ({ assert }) => {
  const loanObj = LoanDetail.transformJsonToObject({
    loanAmount: 300000,
    loanPeriod: 12,
  })

  assert.isTrue(loanObj['loan_amount'] == 300000)
  assert.isTrue(loanObj['loan_period'] == 12)
})
