import { clientApi } from '../client-api';

// 인증번호 발송
export const sendVerificationCode = async (
  phoneNumber: string
): Promise<string> => {
  return clientApi<string>('/phone-verify/create-verify-code', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: phoneNumber,
    }),
  });
};

// 인증번호 검증
export const verifyVerificationCode = async (
  verificationCode: string
): Promise<boolean> => {
  return clientApi<boolean>('/phone-verify/verify-code', {
    method: 'POST',
    body: JSON.stringify({
      verificationCode: verificationCode,
    }),
  });
};
