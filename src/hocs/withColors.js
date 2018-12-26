import React from 'react'
import { Consumer } from './providesColors'
import { getName } from '../helpers/HoCs'

const withColors = (WrappedComponent, specificColor) => {
  const HoCComponent = ({ ...props }) => {
    const propName = (!!specificColor && specificColor.prop) || 'colors'

    return (
      <Consumer>
        {colors => {
          const styleInjection = {
            [propName]: (!!specificColor && colors[specificColor.name]) || colors
          }

          return <WrappedComponent {...props} {...styleInjection} />
        }}
      </Consumer>
    )
  }

  HoCComponent.displayName = `WithColors(${getName(WrappedComponent)})`

  return HoCComponent
}

export default withColors
