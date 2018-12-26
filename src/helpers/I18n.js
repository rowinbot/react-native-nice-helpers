import { isEmpty } from './Conditionals'
import { getType, getArrayString } from './Types'

const interpolate = (i18n, params) => {
  const i18nParams = i18n.match(/&s[0-9]*/g)
  if (isEmpty(i18nParams)) return i18n

  const paramsCount = params.length

  if (!isEmpty(i18nParams)) {
    let result = i18n

    for (let i = 0; i < i18nParams.length; i++) {
      const i18nParam = i18nParams[i]
      const i18nParamNum = i18nParam.slice(2)

      if (i18nParamNum > paramsCount || i18nParamNum <= 0) result = result.replace(i18nParam, '')
      else result = result.replace(i18nParam, params[i18nParamNum - 1])
    }
    return result
  } else return i18n
}

export const interpolateI18n = (i18n, ...params) => {
  if (!isEmpty(i18n)) {
    const i18nType = getType(i18n)

    if (i18nType === 'Array') {
      const i18nShallow = [...i18n]

      const item = getArrayString(i18nShallow)
      if (isEmpty(item.value)) return i18nShallow

      const i18nItem = item.value
      if (isEmpty(i18nItem)) return i18nShallow

      i18nShallow[item.index] = interpolate(i18nItem, params)

      return i18nShallow
    } else if (i18nType === 'String') {
      return interpolate(i18n, params)
    }
  }

  return null
}

export const getI18n = (i18nDef, i18n) => {
  if (!isEmpty(i18n) && !isEmpty(i18nDef)) {
    const i18nType = getType(i18n)
    if (i18nType === 'Array') {
      const i18nShallow = [...i18n]

      const item = getArrayString(i18nShallow)
      if (isEmpty(item.value)) return i18nShallow

      const i18nItem = i18nDef[item.value]
      if (isEmpty(i18nItem)) return i18nShallow

      i18nShallow[item.index] = i18nItem

      return i18nShallow
    } else if (i18nType === 'String') {
      const i18nItem = i18nDef[i18n]

      if (!isEmpty(i18nItem)) return i18nItem
    }
  }

  return null
}

export const extractI18nProps = props => {
  if (isEmpty(props)) return []

  return [
    ...Object.keys(props).reduce((newArr, key) => {
      const i18nPropType = getType(key)
      const i18nProp =
        i18nPropType === 'String' ? key : i18nPropType === 'Array' ? getArrayString(key) : null
      if (isEmpty(i18nProp)) return newArr

      return !isEmpty(i18nProp.match(/i18n[0-9]*Param/g)) ? [...newArr, props[key]] : newArr
    }, [])
  ]
}
