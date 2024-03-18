'use client'

import { persistor, store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
type Props = {
  children: React.ReactNode
}

export const ReduxProvider = (props: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{props.children}</PersistGate>
    </Provider>
  )
}
