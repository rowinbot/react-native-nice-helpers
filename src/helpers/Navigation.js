import React from 'react'
import changesStatusBar from '../hocs/changesStatusBar'
import { getType } from './Types'

import NavigationTransitionConfig from './NavigationTransitionConfig'
import NavigationStyleInterpolator from './NavigationStyleInterpolator'

export class NavigationUse {
  static BottomButton = () => {}

  static initialize(BottomButton) {
    NavigationUse.BottomButton = BottomButton
  }
}

/**
 * Simple screen with no header.
 * > `react-navigation`
 * @param {object} screen component for route
 * @param {string} statusBarStyle style for native status bar (dark/light)
 * @returns {object} containing route definition
 */
export const stackScreen = (
  Screen,
  statusBarStyle,
  navigationOptions = {}
) => ({
  screen: statusBarStyle ? changesStatusBar(Screen, statusBarStyle) : Screen,
  navigationOptions: {
    header: null,
    gesturesEnabled: true,
    swipeEnabled: true,
    ...navigationOptions
  }
})

/**
 * Simple navigation stack with no header.
 * > `react-navigation`
 * @param {string} initialScreenName name for initial route
 * @returns {object} containing route definition
 */
export const stackNavigator = (initialScreenName, config = {}) => {
  let configObject = {}

  if (getType(config) === 'Object') {
    if (config.customTransitions)
      configObject.transitionConfig = () => ({
        transitionConfig: NavigationTransitionConfig.defaultTransition,
        screenInterpolator:
          NavigationStyleInterpolator[config.transitionStyle || 'forHorizontal']
      })
  }

  return {
    initialRouteName: initialScreenName,
    headerMode: 'none',
    ...configObject
  }
}

export const bottomTabScreen = (Screen, statusBarStyle) => {
  const BottomTabBarButton = NavigationUse.BottomButton

  return ({ Icon, Text, Button, onPress }) => ({
    screen: statusBarStyle ? changesStatusBar(Screen, statusBarStyle) : Screen,
    navigationOptions: {
      tabBarIcon: ({ ...props }) => <Icon {...props} size={20} />,
      tabBarLabel: Text,
      tabBarButtonComponent: onPress
        ? ({ ...props }) => (
            <BottomTabBarButton {...props} onPressOverride={onPress} />
          )
        : Button || BottomTabBarButton
    }
  })
}

/**
 * Simple bottom tab navigation.
 * > `react-navigation`
 * @param {object} definition containing `initialScreenName`, `style`
 * @returns {object} containing route definition
 */
export const bottomTabNavigator = ({ initialScreenName }) => ({
  initialRouteName: initialScreenName,

  tabBarOptions: {
    showLabel: true,
    showIcon: true,

    style: {
      borderTopColor: 'rgb(220,220,220)',
      backgroundColor: '#FFF', // TabBar background,
      height: 50,
      paddingTop: 5,
      paddingBottom: 3
    }
  }
})

/**
 * Simple top tab navigation.
 * > `react-navigation`
 * @param {object} definition containing `initialScreenName`, `style`
 * @returns {object} containing route definition
 */
export const topTabNavigator = ({ initialScreenName }) => ({
  initialRouteName: initialScreenName,
  optimizationsEnabled: true,
  lazy: true,

  tabBarOptions: {
    showLabel: true,
    showIcon: false,
    style: {
      marginTop: -8,
      paddingRight: 12,
      paddingLeft: 12,
      backgroundColor: 'rgb(10,105,243)'
    },
    tabStyle: {
      paddingBottom: -11,
      flex: 1,
      opacity: 1
    },
    indicatorStyle: {
      height: 0
    }
  }
})

const replaceScreen = (action, state) => {
  const routes = state.routes.slice(0, state.routes.length - 1)
  routes.push(action)
  return {
    ...state,
    routes,
    index: routes.length - 1
  }
}

export const withReplace = Router => {
  const prevGetStateForAction = Router.router.getStateForAction

  Router.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen')
      return replaceScreen(action, state)
    return prevGetStateForAction(action, state)
  }

  return Router
}
