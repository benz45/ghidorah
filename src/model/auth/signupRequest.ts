import { BaseTypeIdOnly } from "@/model/baseType";

export interface SignupRequest {
  name: string;
  username: string;
  email: string;
  userTypeId: number
  birthday: Date;
  gender: BaseTypeIdOnly;
  role: number[];
  tal: string;
  password: string;
}
