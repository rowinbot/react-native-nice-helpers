import React, { PureComponent } from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { getName } from '../helpers/HoCs'

const withResetTo = WrappedComponent => {
  class HoCComponent extends PureComponent {
    resetTo = name =>
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: name })]
        })
      )

    render() {
      const { ...props } = this.props

      return <WrappedComponent {...props} resetTo={this.resetTo} />
    }
  }

  HoCComponent.displayName = `WithResetTo(${getName(WrappedComponent)})`

  return HoCComponent
}

export default withResetTo
