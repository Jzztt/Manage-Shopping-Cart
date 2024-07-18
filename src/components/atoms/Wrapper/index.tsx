import React from 'react'

interface IWrapper {
    children?: React.ReactNode
}
const Wrapper: React.FC<IWrapper> = (props) => {
  return (
    <div className="container">{props.children}</div>
  )
}

export default Wrapper