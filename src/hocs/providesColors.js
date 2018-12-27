import React, { PureComponent, createContext } from 'react'

import { getName } from '../helpers/HoCs'

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

export default providesColors
