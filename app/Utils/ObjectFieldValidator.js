'use strict'

const InvalidObjectFieldException = use('App/Exceptions/InvalidObjectFieldException')
const invalidFormatMessage = 'Invalid value. Not match with format'
const invalidRangeMessage = 'Invalid value. Not within range.'
const invalidDataTypeMessage = 'Invalid value. Invalid data type.'

class ObjectFieldValidator {
    static genderValidation(data) {
        if ((data !== 'Male') && (data !== 'Female')) 
            throw new InvalidObjectFieldException(invalidFormatMessage + 'gender', 'gender', 400)
        return
    }

    static dateOfBirthValidation(data) {
        this.lengthValidation(data, 3, '/', 'dateOfBirth')
        
        const dobArray = data.split('/')
        this.rangeValidation(Number(dobArray[0]), 1, 31, 'dateOfBirth')
        this.rangeValidation(Number(dobArray[1]), 1, 12, 'dateOfBirth')
            
        const currentDate = new Date()
        const dobDate = new Date(Number(dobArray[2]), Number(dobArray[1]), Number(dobArray[0]), 7, 0, 0) // this constructor quite tricky since it reads
                                                                                                         // machine locale. better use external library
        if (dobDate > currentDate) 
            throw new InvalidObjectFieldException(invalidRangeMessage + 'dateOfBirth', 'dateOfBirth', 400)
        return
    }

    static addressesValidation(data) {
        this.lengthValidation(data, 7, '-', 'addresses')
        return
    }

    static identityCardValidation(data) {
        this.lengthValidation(data, 2, '-', 'identityCard')
        return
    }

    static residentalStatusValidation(data) {
        if (data !== 'rent' && data !== 'permanent')
            throw new InvalidObjectFieldException(invalidFormatMessage + 'residentalStatus', 'residentalStatus', 400)
        return
    }

    static occupationsValidation(data) {
        this.lengthValidation(data, 2, '-', 'occupations')
        return
    }

    static collectibilityStatus(data) {
        this.dataTypeValidation(data, 'integer', 'collectabilityStatus')
        this.rangeValidation(data, 1, 5, 'collectabilityStatus')
        return
    }

    static monthlyExpenseValidation(data) {
        this.dataTypeValidation(data, 'number', 'monthlyExpense')
        this.rangeValidation(data, 0, 3000000, 'monthlyExpense')
        return
    }

    static loanPeriodValidation(data) {
        this.dataTypeValidation(data, 'integer', 'loanPeriod')
        this.rangeValidation(data, 1, 36, 'loanPeriod')
        return
    }
    
    static dataTypeValidation(data, intendedDataType, columnName) {
        console.log(typeof data)
        if (typeof data !== intendedDataType) 
            throw new InvalidObjectFieldException(invalidDataTypeMessage + columnName, columnName, 400)
        return
    }

    static lengthValidation(data, intendedValue, splitter, columnName) {
        const length = data.split(splitter).length
        if (length <= 1 || length > intendedValue)
            throw new InvalidObjectFieldException(invalidFormatMessage + ' ' + columnName, columnName, 400)
        return
    }

    static rangeValidation(data, bottomBounds, upperBounds, columnName) {
        if (data < bottomBounds || data > upperBounds) 
            throw new InvalidObjectFieldException(invalidRangeMessage + ' ' + columnName, columnName, 400)
    }
}

module.exports = ObjectFieldValidator