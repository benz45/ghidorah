import { SigninResponse } from "@/model/auth/signinResponse"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  user: SigninResponse
}
const initialState: IState = {
  user: {}
}
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUser: () => {},
    setUser: (state, action: PayloadAction<SigninResponse>) => {
      return {
        user: action.payload
      }
    },
  }
})

export const {getUser, setUser} = auth.actions
export default auth.reducer