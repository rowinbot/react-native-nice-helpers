import providesTheme from './providesTheme'

export const providesThemeRouter = (Router, theme) => {
  const HoCComponent = providesTheme(Router, theme)

  HoCComponent.router = Router.router

  return HoCComponent
}

export default providesThemeRouter
