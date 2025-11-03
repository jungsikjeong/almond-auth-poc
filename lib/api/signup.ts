import { SignupSchema } from '@/features/auth/schemas/signup-schema';
import { clientApi } from '@lib/client-api';

type LocalSignupRequest = Omit<
  SignupSchema,
  'passwordConfirm' | 'marketingAll'
>;
type LocalSignupResponse = {
  message: string;
};

export const createUser = async (
  data: LocalSignupRequest
): Promise<LocalSignupResponse> => {
  return clientApi('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
