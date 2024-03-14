import { BaseType } from "@/model/baseType";

export interface CreateEmployeeResponse {
  authUserId?:       string;
  birthday?:         Date;
  createdAt?:        Date;
  email?:            string;
  employeeLeval?:    BaseType;
  employeeRoleType?: BaseType;
  gender?:           BaseType;
  id?:               number;
  name?:             string;
  tal?:              string;
  updatedAt?:        Date;
  username?:         string;
}

