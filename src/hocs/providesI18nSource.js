import React, { Component, createContext } from 'react'

import { getName } from '../helpers/HoCs'

export const { Provider, Consumer } = createContext(null)

const providesI18nSource = (WrappedComponent, i18n) => {
  class HoCComponent extends Component {
    state = { i18n: i18n || {} }

    updateI18nSource = source => this.setState({ i18n: source })

    render() {
      const { ...props } = this.props
      const { i18n } = this.state

      return (
        <Provider value={i18n}>
          <WrappedComponent {...props} updateI18nSource={this.updateI18nSource} />
        </Provider>
      )
    }
  }

  HoCComponent.displayName = `ProvidesI18nSource(${getName(WrappedComponent)})`

  return HoCComponent
}

export default providesI18nSource
