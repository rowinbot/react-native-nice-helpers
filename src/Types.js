import { isEmpty } from './Conditionals'

export const getType = value => {
  if (isEmpty(value)) return null

  const funcNameRegex = /function (.{1,})\(/
  const results = funcNameRegex.exec(value.constructor.toString())

  return results && results.length > 1 ? results[1] : ''
}

export const getArrayString = array => {
  if (getType(array) === 'Array') {
    for (let i = 0; i < array.length; i++) {
      if (getType(array[i]) === 'String') return { index: i, value: array[i] }
    }
  }

  return { index: null, value: null }
}
