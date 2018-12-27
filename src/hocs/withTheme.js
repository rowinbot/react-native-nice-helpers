import React from 'react'
import { Consumer } from './providesTheme'
import { getName } from '../helpers/HoCs'

import withColors from './withColors'
/**
 * @param {reactElement} WrappedComponent
 * @param {object} [specificStyle]
 */
const withTheme = (WrappedComponent, specificStyle) => {
  const HoCComponent = ({ colors, ...props }) => {
    const propName = (!!specificStyle && specificStyle.prop) || 'theme'

    return (
      <Consumer>
        {theme => {
          const coloredTheme = theme(colors)

          const style =
            (!!specificStyle && (coloredTheme[specificStyle.name] || null)) ||
            coloredTheme

          const styleInjection = {
            [propName]: style
          }

          return <WrappedComponent {...props} {...styleInjection} />
        }}
      </Consumer>
    )
  }

  HoCComponent.displayName = `WithTheme(${getName(WrappedComponent)})`

  return withColors(HoCComponent)
}

export default withTheme
