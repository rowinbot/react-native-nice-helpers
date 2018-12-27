import providesColors from './providesColors'
import providesTheme from './providesTheme'

const providesThemedRouter = (Router, colors, theme) => {
  const HoCComponent = providesColors(providesTheme(Router, theme), colors)

  HoCComponent.router = Router.router

  return HoCComponent
}

export default providesThemedRouter
