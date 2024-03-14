import React, { useContext } from 'react'
import { RouteParamHomePage } from '~/components/home/homePage'
import { TabSelectPagesControlContext, TabSelectPagesControlProps } from '~/components/home/tabSelectPagesControl'
import useRoute from '~/hook/router'
import { Each } from '~/util/util'
import OptionSelectStore from './optionSelectStore'

export default function TabHeaderSelectPages() {
  const route = useRoute<RouteParamHomePage>()
  const context = useContext(TabSelectPagesControlContext)
  return (
    <div className="bg-white h-12 flex items-center">
      <OptionSelectStore />
      <div className="flex">
        <Each
          values={context.tablabels}
          render={(label, index) => (
            <React.Fragment>
              <div
                key={`TabSelectPages-${index}`}
                onClick={() => {
                  context.setCurrentTab?.(index)
                  if (index == 0) {
                    route.to('/product/employee', { TabSelectinitialIndex: 0 })
                  }
                }}
                className={`hover:bg-opacity-50 ${
                  context.currentTab?.index === index
                    ? 'bg-success text-white'
                    : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                } px-5 py-2 rounded-lg text-sm mr-2 cursor-pointer`}
              >
                {label}
              </div>
            </React.Fragment>
          )}
        />
      </div>
    </div>
  )
}
