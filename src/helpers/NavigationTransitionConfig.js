import { Animated, Easing } from 'react-native'
import NavigationStyleInterpolator from './NavigationStyleInterpolator'

const TransitionSpec = {
  duration: 500,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing
}

export default class NavigationTransitionConfig {
  static SlideFromRight = {
    transitionSpec: TransitionSpec,
    screenInterpolator: NavigationStyleInterpolator.forHorizontal,
    containerStyle: {
      backgroundColor: '#FFF'
    }
  }

  static ModalSlideFromBottom = {
    transitionSpec: TransitionSpec,
    screenInterpolator: NavigationStyleInterpolator.forVertical,
    containerStyle: {
      backgroundColor: '#FFF'
    }
  }

  static defaultTransition = isModal => {
    return isModal
      ? NavigationTransitionConfig.ModalSlideFromBottom
      : NavigationTransitionConfig.SlideFromRight
  }
}
