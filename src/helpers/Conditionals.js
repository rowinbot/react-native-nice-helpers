export const ifOrNull = (condition, value) => (!!condition ? value : null)

export const isEmpty = value => {
  if (value === undefined && value === null) return true

  if (typeof value === 'function') return false
  if (typeof value === 'boolean') return false

  if (value instanceof Array) return !!value && value.length <= 0

  if (value instanceof String) return value === ''

  if (value instanceof Object) return !!value && Object.keys(value).length <= 0

  return !value
}

export const isEqual = (value, alterValue) => {
  return JSON.stringify(value) === JSON.stringify(alterValue)
}

export const hasValue = value => value !== undefined && value !== null && true
