const asNavigator = (WrappedComponent, WrappedNavigator, router) => {
  WrappedComponent.router = router || WrappedNavigator.router

  return WrappedComponent
}

export default asNavigator
