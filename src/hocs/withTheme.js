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

    console.log(colors)

    return null
  }

  HoCComponent.displayName = `WithTheme(${getName(WrappedComponent)})`

  return withColors(HoCComponent)
}

export default withTheme
