export interface CreateCustomerRequest {
  birthday: Date;
  email: string;
  gender: Gender;
  name: string;
  tal: string;
  username: string;
  password: string;
}

export interface Gender {
  id: number;
}
