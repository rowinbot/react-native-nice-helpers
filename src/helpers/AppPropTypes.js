export const arrayPropTypes = {
  determinedLength(expectedLength, props, propName, componentName) {
    if (props[propName]) {
      const arrayPropLength = props[propName].length

      if (arrayPropLength !== expectedLength) {
        return new Error(
          `Invalid array length ${arrayPropLength} (expected ${expectedLength}) for prop ${propName} supplied to ${componentName}. Validation failed.`
        )
      }
    }
  },

  maxLength(expectedLength) {
    return (props, propName, componentName) => {
      if (props[propName]) {
        const arrayPropLength = props[propName].length

        if (arrayPropLength > expectedLength) {
          return new Error(
            `Invalid array length ${arrayPropLength} (expected ${expectedLength}) for prop ${propName} supplied to ${componentName}. Validation failed.`
          )
        }
      }
    }
  }
}
