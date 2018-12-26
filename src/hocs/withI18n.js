import React from 'react'
import { Consumer } from './providesI18n'
import { getName } from '../helpers/HoCs'
import { isEmpty } from '../helpers/Conditionals'
import { getI18n, interpolateI18n, extractI18nProps } from '../helpers/I18n'
import { getType } from '../helpers/Types'

const withI18n = (i18nProp, withI18n) => {
  const propType = getType(i18nProp)
  const propName = i18nProp || 'label'

  return WrappedComponent => {
    const HoCComponent = ({ ...props }) => {
      return (
        <Consumer>
          {i18n => {
            const i18nItem = {}

            if (!isEmpty(i18nProp)) {
              if (propType === 'Array') {
                for (let i = 0; i < i18nProp.length; i++) {
                  i18nItem[i18nProp[i]] =
                    interpolateI18n(
                      getI18n(i18n, props[i18nProp[i]]),
                      ...extractI18nProps(props)
                    ) || props[i18nProp[i]]
                }
              } else if (propType === 'String') {
                i18nItem[propName] =
                  interpolateI18n(getI18n(i18n, props[i18nProp]), ...extractI18nProps(props)) ||
                  props[i18nProp]
              }
            }

            const propInjection = !isEmpty(i18nItem)
              ? {
                  ...i18nItem,
                  i18n: withI18n ? i18n : undefined
                }
              : { i18n }

            return <WrappedComponent {...props} {...propInjection} />
          }}
        </Consumer>
      )
    }

    HoCComponent.displayName = `WithI18n(${getName(WrappedComponent)})`

    return HoCComponent
  }
}

export default withI18n
