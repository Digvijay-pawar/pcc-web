export interface ILoginPayload {
  mobileNumber: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  res: {
    accessToken: string;
    role: string;
  };
}

export interface IForgotPasswordPayload {
  mobileNumber: string;
}

export interface IResetPasswordPayload {
  mobileNumber: string;
  otp: string;
  newPassword: string;
}

export interface IValidateTokenResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    role: string;
  };
}
