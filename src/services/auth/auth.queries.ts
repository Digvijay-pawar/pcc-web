import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { setAuthTokens } from '../../lib/axios';
import type {
  ILoginPayload,
  ILoginResponse,
  IForgotPasswordPayload,
  IResetPasswordPayload,
  IValidateTokenResponse,
} from './auth.types';

const loginApi = (payload: ILoginPayload): Promise<ILoginResponse> => {
  return api.post('/auth/login', payload);
};

const forgotPasswordApi = (payload: IForgotPasswordPayload): Promise<void> => {
  return api.post('/auth/forgot-password', payload);
};

const resetPasswordApi = (payload: IResetPasswordPayload): Promise<void> => {
  return api.post('/auth/reset-password', payload);
};

const validateTokenApi = (): Promise<IValidateTokenResponse> => {
  return api.get('/auth/validate-token');
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuthTokens(data.res.accessToken, data.res.role);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
};

export const useValidateToken = () => {
  return useQuery({
    queryKey: ['validateToken'],
    queryFn: validateTokenApi,
    retry: false,
    enabled: false,
  });
};
