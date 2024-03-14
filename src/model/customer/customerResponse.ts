export interface CustomerResponse {
  authUserId?:    string;
  birthday?:      Date;
  createdAt?:     Date;
  customerLeval?: BaseType;
  email?:         string;
  gender?:        BaseType;
  id?:            number;
  name?:          string;
  tal?:           string;
  updatedAt?:     Date;
  username?:      string;
}

export interface BaseType {
  id?:     number;
  nameEn?: string;
  nameTh?: string;
}
