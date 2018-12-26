import React, { createContext } from 'react'

import { Consumer as SourceConsumer } from './providesI18nSource'
import { getName } from '../helpers/HoCs'
import { isEmpty } from '../helpers/Conditionals'
import { getType } from '../helpers/Types'

export const { Provider, Consumer } = createContext(null)

const providesI18n = (WrappedComponent, i18n) => {
  const HoCComponent = ({ ...props }) => (
    <SourceConsumer>
      {i18nSource => {
        return (
          <Provider
            value={
              !isEmpty(i18nSource) && getType(i18n) === 'String'
                ? i18nSource[i18n]
                : i18n
            }>
            <WrappedComponent {...props} />
          </Provider>
        )
      }}
    </SourceConsumer>
  )

  HoCComponent.displayName = `ProvidesI18n(${getName(WrappedComponent)})`

  return HoCComponent
}

export default providesI18n
