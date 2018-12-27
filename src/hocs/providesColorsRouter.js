import providesColors from './providesColors'

export const providesColorsRouter = (Router, colors) => {
  const HoCComponent = providesColors(Router, colors)

  HoCComponent.router = Router.router

  return HoCComponent
}

export default providesColorsRouter
