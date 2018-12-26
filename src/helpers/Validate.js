import { capitalizeSentence } from './Strings'
import validateJs from 'validate.js'
import globalValidations from './validations'

/*-- Usage: 
      Validate = CustomValidate(myComponentsValidations)
      
      Note: See ./validations.js to check syntax 
        for declaring validations! --*/
export const CustomValidate = validations => {
  return (fieldName, value) => {
    var formValues = {}
    var formFields = {}

    if (fieldName === 'date') {
      if (!!value) return value.split('/')[2] === '0' ? 'Enter at least year' : null
      else if (!value) return validations.empty
    }

    formValues[fieldName] = value
    formFields[fieldName] = validations[fieldName]

    const result = validateJs(formValues, formFields)

    // If there is an error message, return it!
    if (result) {
      // Return only the field error message if there are multiple
      return result[fieldName][0].split(`${capitalizeSentence(fieldName)} `).join('')
    }

    return null
  }
}

/*-- Usage: 
      Validate("fieldNameDeclaredInValidations", fieldValue) --*/
export const Validate = CustomValidate(globalValidations)
