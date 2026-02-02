export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  accessToken: string;
  role?: string;
}

export interface LoginResponse extends AuthTokens {
  user: {
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    role: string;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  role?: string;
}
