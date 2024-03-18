import { PageResponse } from "@/model/page/pageResponse"
import { StoreEmployeePageResponse } from "@/model/store/storeEmployeePageResponse"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  storeEmployee: {
    pages: PageResponse<StoreEmployeePageResponse> | undefined
    selected: StoreEmployeePageResponse | undefined
  }
}
const initialState: IState = {
  storeEmployee: {
    pages: undefined,
    selected: undefined
  }
}
const store = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStoreEmployeePage: (state, action: PayloadAction<PageResponse<StoreEmployeePageResponse>>) => ({
      storeEmployee: {
        ...state.storeEmployee,
        pages: action.payload
      }
    }),
    setSelectStore: (state, action: PayloadAction<StoreEmployeePageResponse>) => ({
      storeEmployee: {
        ...state.storeEmployee,
        selected: action.payload
      }
    }),
  }
})

export const {setStoreEmployeePage, setSelectStore} = store.actions
export default store.reducer