import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { withNavigation } from 'react-navigation'

const withBackHandler = WrappedComponent => {
  class Wrapper extends Component {
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }

    handleBackPress = () => {
      this.props.navigation.pop()
    }

    render() {
      const { navigation: _navigation, ...props } = this.props

      return <WrappedComponent {...props} />
    }
  }
  return withNavigation(Wrapper)
}

export default withBackHandler
