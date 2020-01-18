'use strict'

const ObjectFieldValidator = use('App/Utils/ObjectFieldValidator')

class CommonBaseModel {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.transformJsonToObject = function (jsonData) {
      const object = new Model()
      const columns = options.columns
      for (const key in jsonData) {
          const functionName = key + 'Validation'
          if (typeof ObjectFieldValidator[functionName] === 'function') ObjectFieldValidator[functionName](jsonData[key])
          object[columns[key]] = jsonData[key]
      }
      return object
    } 
  }
}

module.exports = CommonBaseModel
