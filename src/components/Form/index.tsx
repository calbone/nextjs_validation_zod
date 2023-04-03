import { useRouter } from 'next/router'

import Confirm from './Confirm'
import Input from './Input'
import { useCreateForm } from './useCreateForm'

export default function Form() {
  const router = useRouter()
  const step = Array.isArray(router.query.step)
    ? router.query.step[0]
    : router.query.step
  const { FormProvider, method } = useCreateForm()
  const currentDisplay = (step: string | undefined) => {
    switch (step) {
      case 'confirm':
        return <Confirm />
      default:
        return <Input />
    }
  }
  return <FormProvider {...method}>{currentDisplay(step)}</FormProvider>
}
