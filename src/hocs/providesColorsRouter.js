import providesColors from './providesColors'
import providesTheme from './providesTheme'

export const providesThemedRouter = (Router, colors, theme) => {
  const HoCComponent = providesColors(providesTheme(Router, theme), colors)

  HoCComponent.router = Router.router

  return HoCComponent
}

export const providesColorsRouter = (Router, colors) => {
  const HoCComponent = providesColors(Router, colors)

  HoCComponent.router = Router.router

  return HoCComponent
}

export default providesColorsRouter
