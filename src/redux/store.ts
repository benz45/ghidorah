import authReducer from '@/redux/reducers/auth.reducer'
import employeeReducer from '@/redux/reducers/employee.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    authReducer,
    employeeReducer,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
