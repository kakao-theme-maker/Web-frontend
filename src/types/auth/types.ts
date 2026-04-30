export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  hasAgeConsent: boolean;
  hasTermsConsent: boolean;
  hasPrivacyConsent: boolean;
}

export interface IAuthResponse {
  email?: string;
}
