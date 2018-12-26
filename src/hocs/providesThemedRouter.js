import providesTheme from './providesTheme'

export const providesThemedRouter = (theme, Router) => {
  const HoCComponent = providesTheme(theme, Router)

  HoCComponent.router = Router.router

  return HoCComponent
}

export default providesThemedRouter
