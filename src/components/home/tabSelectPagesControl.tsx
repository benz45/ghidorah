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
function TabSelectPagesControl(props: { children: React.ReactNode[]; labels: string[] }) {
  const [currentTab, setCurrentTab] = React.useState<ITabSelectPagesControl['currentTab']>({
    index: 0,
    label: props.labels[0]
  })
  const shouldSetCurrentTab = (index: number) => setCurrentTab(prev => ({ index, label: props.labels[index] }))
  const childrens = props.children.map((children, index) => {
    const elem = React.cloneElement(
      children as React.DetailedReactHTMLElement<any, HTMLElement>,
      {
        currentTab,
        tablabels: props.labels,
        setCurrentTab: shouldSetCurrentTab
      } as ITabSelectPagesControl
    )
    return <React.Fragment key={`TabSelectPagesControl-${index}`}>{elem}</React.Fragment>
  })
  return (
    <TabSelectPagesControlContext.Provider
      value={{ tablabels: props.labels, currentTab, setCurrentTab: shouldSetCurrentTab }}
    >
      <div className="flex flex-col w-full h-full">{childrens}</div>
    </TabSelectPagesControlContext.Provider>
  )
}

export default TabSelectPagesControl
