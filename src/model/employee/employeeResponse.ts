export interface EmployeeResponse {
  createdAt: Date
  updatedAt: Date
  id: number
  authUserId: string
  user: User
  name: string
  email: string
  tal: string
  birthday: Date
  gender: EmployeeLeval
  employeeLeval: EmployeeLeval
  employeeRoleType: EmployeeLeval
}

export interface EmployeeLeval {
  nameTh: string
  nameEn: string
  id: number
}

export interface User {
  createdAt: Date
  updatedAt: Date
  id: number
  username: string
  userType: EmployeeLeval
  roleTypes: EmployeeLeval[]
}
