export const withKeys = (obj, keys) => ({
  ...keys.reduce((newObj, key) => {
    return obj[key] ? { ...newObj, [key]: obj[key] } : newObj
  }, {})
})

export const withoutKeys = (obj, keys) => ({
  ...keys.reduce((newObj, key) => {
    return !obj[key] ? { ...newObj, [key]: obj[key] } : newObj
  }, {})
})
