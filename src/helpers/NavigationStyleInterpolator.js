const getSceneIndicesForInterpolationInputRange = props => {
  const { scene, scenes } = props
  const index = scene.index
  const lastSceneIndexInScenes = scenes.length - 1
  const isBack = !scenes[lastSceneIndexInScenes].isActive

  if (isBack) {
    const currentSceneIndexInScenes = scenes.findIndex(item => item === scene)
    const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive)
    const targetSceneIndex = scenes[targetSceneIndexInScenes].index
    const lastSceneIndex = scenes[lastSceneIndexInScenes].index

    if (
      index !== targetSceneIndex &&
      currentSceneIndexInScenes === lastSceneIndexInScenes
    ) {
      return {
        first: Math.min(targetSceneIndex, index - 1),
        last: index + 1
      }
    } else if (
      index === targetSceneIndex &&
      currentSceneIndexInScenes === targetSceneIndexInScenes
    ) {
      return {
        first: index - 1,
        last: Math.max(lastSceneIndex, index + 1)
      }
    } else if (
      index === targetSceneIndex ||
      currentSceneIndexInScenes > targetSceneIndexInScenes
    ) {
      return null
    } else {
      return { first: index - 1, last: index + 1 }
    }
  } else {
    return { first: index - 1, last: index + 1 }
  }
}

export default class NavigationStyleInterpolator {
  static forInitial(props) {
    const { navigation, scene } = props

    const focused = navigation.state.index === scene.index
    const opacity = focused ? 1 : 0

    const translate = focused ? 0 : 1000000
    return {
      opacity,
      transform: [{ translateX: translate }, { translateY: translate }]
    }
  }

  static forHorizontal(props) {
    const { layout, position, scene } = props

    if (!layout.isMeasured) {
      return NavigationStyleInterpolator.forInitial(props)
    }
    const interpolate = getSceneIndicesForInterpolationInputRange(props)

    if (!interpolate) return { opacity: 0 }

    const { first, last } = interpolate
    const index = scene.index
    const opacity = position.interpolate({
      inputRange: [first, first + 0.01, index, last - 0.01, last],
      outputRange: [0, 1, 1, 0.85, 0]
    })

    const width = layout.initWidth
    const translateX = position.interpolate({
      inputRange: [first, index, last],
      outputRange: [width, 0, width * -0.3]
    })
    const translateY = 0

    return {
      opacity,
      transform: [{ translateX }, { translateY }]
    }
  }

  static forVertical(props) {
    const { layout, position, scene } = props

    if (!layout.isMeasured) {
      return NavigationStyleInterpolator.forInitial(props)
    }
    const interpolate = getSceneIndicesForInterpolationInputRange(props)

    if (!interpolate) return { opacity: 0 }

    const { first, last } = interpolate
    const index = scene.index
    const opacity = position.interpolate({
      inputRange: [first, first + 0.01, index, last - 0.01, last],
      outputRange: [0, 1, 1, 0.85, 0]
    })

    const height = layout.initHeight
    const translateY = position.interpolate({
      inputRange: [first, index, last],
      outputRange: [height, 0, 0]
    })
    const translateX = 0

    return {
      opacity,
      transform: [{ translateX }, { translateY }]
    }
  }
}
