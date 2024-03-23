import { ProductPageResponse } from '@/model/product/productPageResponse'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IState {
  productPage: ProductPageResponse | undefined
}
const initialState: IState = {
  productPage: undefined
}
const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductPage: (state, action: PayloadAction<ProductPageResponse | undefined>) => ({
      productPage: action.payload
    })
  }
})

export const { setProductPage } = product.actions
export default product.reducer
