import React, { PureComponent, createContext } from 'react'

import { getName } from '../helpers/HoCs'
import providesTheme from './providesTheme'

export const { Provider, Consumer } = createContext(null)

const providesColors = (WrappedComponent, colors) => {
  class HoCComponent extends PureComponent {
    render() {
      const { innerRef, ...props } = this.props
      return (
        <Provider value={colors}>
          <WrappedComponent {...props} ref={innerRef} />
        </Provider>
      )
    }
  }

  HoCComponent.displayName = `ProvidesColors(${getName(WrappedComponent)})`

  return HoCComponent
}

export const providesColorsWithTheme = (colors, theme, Router) => {
  const HoCComponent = providesColors(colors, providesTheme(theme, Router))

  return HoCComponent
}

export const mergeColors = (parent, child) => ({ ...parent, ...child })

export default providesColors
