import providesI18n from './providesI18n'

export const providesI18nRouter = (Router, i18n) => {
  const HoCComponent = providesI18n(Router, i18n)

  HoCComponent.router = Router.router

  return HoCComponent
}

export default providesI18nRouter
