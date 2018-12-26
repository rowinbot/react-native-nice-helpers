import React from 'react'

const injectProps = (WrappedComponent, hoCProps) => {
  const HoCComponent = ({ ...props }) => {
    return <WrappedComponent {...hoCProps} {...props} />
  }

  HoCComponent.displayName = 'InjectProp'

  return HoCComponent
}

export default injectProps
