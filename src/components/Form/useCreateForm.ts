import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import * as z from 'zod'

import type { User } from '@/states/userState'
import { userState } from '@/states/userState'

const Schema = z.object({
  name: z.string().nonempty({ message: '必須項目です。' }).min(4, {
    message: '4文字以上入力してください。',
  }),
  email: z
    .string()
    .nonempty({ message: 'メールアドレスを入力してください。' })
    .email({ message: '入力形式がメールアドレスではありません。' }),
  country: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => !!value, { message: '１つの国を選択してください。' }),
  memberStatus: z.optional(
    z.enum(['gold', 'silver', 'bronze'], {
      errorMap: () => ({ message: '選択してください。' }),
    })
  ),
})

type Forms = z.infer<typeof Schema>

export const useCreateForm = () => {
  const user = useRecoilValue<User>(userState)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Forms>({
    resolver: zodResolver(Schema),
  })

  const onSubmit: SubmitHandler<Forms> = (values) =>
    new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })

  return {
    user,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit,
  }
}
