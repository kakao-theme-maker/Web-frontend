export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
