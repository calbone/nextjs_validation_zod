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
  name: z.string().nonempty({ message: 'This is required' }).min(4, {
    message: 'Minimum length should be 4',
  }),
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
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
            <FormHelperText>We&lsquo;ll never share your email.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select placeholder="Select country">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </FormControl>
        </VStack>
        <ButtonGroup spacing="8" mt={4}>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
            Submit
          </Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
      </form>
    </Container>
  )
}
