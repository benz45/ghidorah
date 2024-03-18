import { EmployeeResponse } from "@/model/employee/employeeResponse"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  employee: EmployeeResponse | undefined
}
const initialState: IState = {
  employee: undefined
}

const employee = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployee: () => {},
    setEmployee: (state, action: PayloadAction<EmployeeResponse>) => ({
      employee: action.payload
    }),
  }
})

export const {getEmployee, setEmployee} = employee.actions
export default employee.reducer