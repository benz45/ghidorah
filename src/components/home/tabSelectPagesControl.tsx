'use client'
import React from 'react'

interface ITabSelectPagesControl {
  tablabels: string[]
  currentTab?: {
    index: number
    label: string
  }
  setCurrentTab?: (index: number) => void
}

export type TabSelectPagesControlProps = Optional<ITabSelectPagesControl>

const TabSelectPagesControlContextValue: ITabSelectPagesControl = {
  tablabels: []
}

export const TabSelectPagesControlContext = React.createContext(TabSelectPagesControlContextValue)
function TabSelectPagesControl(props: { children: React.ReactNode[]; labels: string[]; initialPage: number }) {
  const [currentTab, setCurrentTab] = React.useState<ITabSelectPagesControl['currentTab']>({
    index: props.initialPage,
    label: props.labels[props.initialPage]
  })
  const shouldSetCurrentTab = (index: number) => setCurrentTab(prev => ({ index, label: props.labels[index] }))
  return (
    <TabSelectPagesControlContext.Provider
      value={{ tablabels: props.labels, currentTab, setCurrentTab: shouldSetCurrentTab }}
    >
      <div className="flex flex-col w-full h-full">{props.children}</div>
    </TabSelectPagesControlContext.Provider>
  )
}

export default TabSelectPagesControl
