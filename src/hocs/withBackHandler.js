import React, { Component } from 'react'
import { BackHandler } from 'react-native'

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
      const { ...props } = this.props

      return <WrappedComponent {...props} />
    }
  }
  return Wrapper
}

export default withBackHandler
