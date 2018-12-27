import providesColors from './providesColors'
import providesTheme from './providesTheme'

export const providesColorsWithTheme = (Router, colors, theme) => {
  const HoCComponent = providesColors(providesTheme(Router, theme), colors)

  return HoCComponent
}

export default providesColorsWithTheme
