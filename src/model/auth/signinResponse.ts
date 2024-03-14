export interface SigninResponse {
  accessToken?:  string;
  refreshToken?: string;
  type?:         string;
  id?:           number;
  username?:     string;
  email?:        string;
  roles?:        string[];
}
