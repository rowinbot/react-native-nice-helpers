import NavigationStyleInterpolator from './NavigationStyleInterpolator'

const TransitionSpec = (Easing, Animated) => ({
  duration: 500,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing
})

export default class NavigationTransitionConfig {
  static init(Easing, Animated) {
    NavigationTransitionConfig.TransitionSpec = TransitionSpec(Easing, Animated)
  }

  static SlideFromRight = {
    transitionSpec: NavigationTransitionConfig.TransitionSpec,
    screenInterpolator: NavigationStyleInterpolator.forHorizontal,
    containerStyle: {
      backgroundColor: '#FFF'
    }
  }

  static ModalSlideFromBottom = {
    transitionSpec: NavigationTransitionConfig.TransitionSpec,
    screenInterpolator: NavigationStyleInterpolator.forVertical,
    containerStyle: {
      backgroundColor: '#FFF'
    }
  }

  static defaultTransition(isModal) {
    return isModal
      ? NavigationTransitionConfig.ModalSlideFromBottom
      : NavigationTransitionConfig.SlideFromRight
  }
}
