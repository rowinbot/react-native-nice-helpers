import React, { Component } from 'react'
import { StatusBar } from 'react-native'

import { getName } from '../helpers/HoCs'
import { withNavigationFocus } from 'react-navigation'

const statusBarStyle = style => `${style || 'light'}-content`

const changesStatusBar = (WrappedComponent, style) => {
  class HoCComponent extends Component {
    state = { style: statusBarStyle(style) }

    changeStatusBar = newStyle => this.setState({ style: statusBarStyle(newStyle) })

    componentDidMount() {
      this.updateStatusBar()
    }

    componentDidUpdate() {
      !!this.props.isFocused && this.updateStatusBar()
    }

    updateStatusBar = () => StatusBar.setBarStyle(this.state.style, true)

    render() {
      const { isFocused, ...props } = this.props

      return <WrappedComponent changeStatusBar={this.changeStatusBar} {...props} />
    }
  }

  HoCComponent.displayName = `ChangesStatusBar(${getName(WrappedComponent)})`

  return withNavigationFocus(HoCComponent)
}

export default changesStatusBar
