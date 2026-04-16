export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  age: boolean;
  terms: boolean;
  privacy: boolean;
}

export interface IAuthResponse {
  email?: string;
}
