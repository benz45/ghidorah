import authReducer from '@/redux/reducers/auth.reducer'
import baseLayoutReducer from '@/redux/reducers/baseLayout.reducer'
import employeeReducer from '@/redux/reducers/employee.reducer'
import storeReducer from '@/redux/reducers/store.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)
const persistedEmployeeReducer = persistReducer(persistConfig, employeeReducer)
const persistedStoreReducer = persistReducer(persistConfig, storeReducer)
const persistedBaseLayoutReducer = persistReducer(persistConfig, baseLayoutReducer)

export const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    employeeReducer: persistedEmployeeReducer,
    storeReducer: persistedStoreReducer,
    baseLayoutReducer: persistedBaseLayoutReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const persistor = persistStore(store)
