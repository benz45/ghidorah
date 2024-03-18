import { BaseLayoutParams } from '@/hook/routeParams'
import { getSearchParams } from '@/util/util'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface HeaderLabelSelector {
  id: number
  label: string
}
interface IState {
  valueHeaderLabelSelector: HeaderLabelSelector[]
  headerLabelSelected: HeaderLabelSelector | undefined
}


const valueHeaderLabelSelector = [
  { id: 1, label: 'Products' },
  { id: 2, label: 'Order' },
  { id: 3, label: 'Table View' },
  { id: 4, label: 'Pay Later View' }
] as HeaderLabelSelector[]

const initialState: IState = {
  valueHeaderLabelSelector,
  headerLabelSelected: undefined
}

const getInitState = (): IState => {
  const tebIndex = getSearchParams<BaseLayoutParams>('tebIndex')
  const isHaveSelector = tebIndex !== undefined && valueHeaderLabelSelector[tebIndex] !== undefined
  return {
    ...initialState,
    headerLabelSelected: isHaveSelector ? valueHeaderLabelSelector[tebIndex] : initialState.valueHeaderLabelSelector[0]
  }
}

const baseLayoutSelector = createSlice({
  name: 'baseLayoutSelector',
  initialState: getInitState(),
  reducers: {
    setHeaderLabelSelectByIndex: (state, action: PayloadAction<number | undefined>) => ({
      ...state,
      headerLabelSelected: action.payload !== undefined ? valueHeaderLabelSelector[action.payload] : state.headerLabelSelected
    }),
    setHeaderLabelSelected: (state, action: PayloadAction<HeaderLabelSelector>) => ({
      ...state,
      headerLabelSelected: action.payload
    })
  }
})

export const { setHeaderLabelSelected, setHeaderLabelSelectByIndex } = baseLayoutSelector.actions
export default baseLayoutSelector.reducer
