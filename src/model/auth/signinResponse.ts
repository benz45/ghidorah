import { BaseType } from "@/model/baseType";

export interface SigninResponse {
  accessToken?:  string;
  refreshToken?: string;
  type?:         string;
  id?:           number;
  username?:     string;
  userType?:     BaseType;
  email?:        string;
  roles?:        string[];
}
