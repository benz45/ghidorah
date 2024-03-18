'use client'
import HocGetEmployee from '@/components/employee/hocGetEmployee'
import LeftMenuBar from '@/components/home/leftMenuBar'
import SelectStore from '@/components/home/selectStore'
import { BaseLayoutParams } from '@/hook/routeParams'
import useRoute from '@/hook/router'
import { setHeaderLabelSelected } from '@/redux/reducers/baseLayout.reducer'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { Each } from '@/util/util'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function BaseLayoutCompomnent(props: { children: React.ReactNode }) {
  const route = useRoute<BaseLayoutParams>()
  const dispatch = useDispatch<AppDispatch>()
  const { valueHeaderLabelSelector, headerLabelSelected } = useAppSelector(store => store.baseLayoutReducer)
  return (
    <HocGetEmployee>
      <main className="flex h-screen w-full">
        <div className="w-full flex bg-primary-light">
          <LeftMenuBar />
          <div className="flex flex-col w-full h-full ">
            <div className="bg-white h-14 flex items-center">
              <SelectStore />
              <div className="flex h-14 items-center">
                <Each
                  values={valueHeaderLabelSelector}
                  render={(elem, index) => (
                    <React.Fragment>
                      <div
                        key={`TabSelectPages-${index}`}
                        onClick={() => {
                          dispatch(setHeaderLabelSelected(elem))
                          route.to('/product/employee', { tebIndex: index })
                        }}
                        className={`hover:bg-opacity-50 h-10 flex items-center ${
                          headerLabelSelected?.id === elem.id
                            ? 'bg-success text-white'
                            : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                        } px-5 py-2 rounded-lg text-sm mr-2 cursor-pointer`}
                      >
                        {elem.label}
                      </div>
                    </React.Fragment>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex p-10 overflow-y-auto">{props.children}</div>
          </div>
        </div>
      </main>
    </HocGetEmployee>
  )
}
