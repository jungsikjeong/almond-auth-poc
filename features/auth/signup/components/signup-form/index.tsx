'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import {
  SignupSchema,
  signupSchema,
} from '@/features/auth/schemas/signup-schema';
import { AgreementsSection } from '@/features/auth/signup/components/agreement';
import { useSignup } from '@/features/auth/signup/hooks/use-signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupFormFields } from './signup-form-fields';

export function SignupForm() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      // 회원 정보 필드
      loginId: '',
      username: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      // 필수 약관
      isOver14: false,
      termsOfService: false,
      electronicTransaction: false,
      privacyPolicy: false,
      thirdPartySharing: false,

      // 선택 약관
      marketingConsent: false,
    },
  });

  const { signup, isLoading } = useSignup(form);

  const onSubmit = async (data: SignupSchema) => {
    await signup(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* 회원 정보 입력 필드들 */}
        <SignupFormFields form={form} />

        {/* 약관 동의 섹션 */}
        <div className="h-32 overflow-y-auto py-4">
          <AgreementsSection form={form} />
        </div>
        {/* 제출 버튼 */}
        <div className="w-full">
          <Button
            type="submit"
            disabled={!form.formState.isValid || isLoading}
            className={`h-[42px] w-full ${
              !form.formState.isValid
                ? 'bg-gray-70 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            {isLoading ? (
              <Spinner className="size-4 text-white" />
            ) : (
              '동의하고 가입하기'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
