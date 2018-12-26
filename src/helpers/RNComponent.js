export const composeKeyExtractor = key => item => `${item[key || 'id']}`

export const regularKeyExtractor = item => {
  return `${item.id}`
}
