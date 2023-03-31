import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
})

type NameType = z.infer<typeof Schema>

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NameType>({
    resolver: zodResolver(Schema),
  })

  const onSubmit: SubmitHandler<NameType> = (values) =>
    new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })

  const contries = [
    { value: '1', name: 'United Arab Emirates' },
    { value: '2', name: 'Nigeria' },
  ]

  return (
    <Container maxW="container.sm">
      <Heading as="h1" mb="24px">
        RHF + Zod Form
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="16px">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" placeholder="name" {...register('name')} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              placeholder="email"
              type="email"
              {...register('email')}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            <FormHelperText>We&lsquo;ll never share your email.</FormHelperText>
          </FormControl>
          <FormControl isInvalid={!!errors.country}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Select
              id="country"
              placeholder="Select country"
              {...register('country')}
            >
              {contries.map((country, index) => (
                <option key={index} value={country.value}>
                  {country.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.country && errors.country?.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <ButtonGroup spacing="6" mt={4}>
          <Button variant="outline">Reset</Button>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  )
}
