import providesColors from './providesColors'
import providesTheme from './providesTheme'

export const providesThemedRouter = (colors, theme, Router) => {
  const HoCComponent = providesColors(colors, providesTheme(theme, Router))

  HoCComponent.router = Router.router

  return HoCComponent
}

export const providesColorsRouter = (colors, Router) => {
  const HoCComponent = providesColors(colors, Router)

  HoCComponent.router = Router.router

  return HoCComponent
}

export default providesColorsRouter
