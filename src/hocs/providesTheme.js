import React, { createContext } from 'react'

import { getName } from '../helpers/HoCs'

export const { Provider, Consumer } = createContext(null)

const providesTheme = (WrappedComponent, theme) => {
  const HoCComponent = ({ ...props }) => (
    <Provider value={theme}>
      <WrappedComponent {...props} />
    </Provider>
  )

  HoCComponent.displayName = `ProvidesTheme(${getName(WrappedComponent)})`

  return HoCComponent
}

export default providesTheme
