import React from 'react'

export function RendomComponent(props: { counter: number; then: React.ReactNode }): React.JSX.Element[] {
  return Array.from(Array(props.counter).keys()).map((key, i) => {
    return <React.Fragment key={`RendomComponent${key}`}>{props.then}</React.Fragment>
  })
}
