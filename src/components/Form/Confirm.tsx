import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import type { Forms } from './useCreateForm'
import { useCreateForm } from './useCreateForm'

export default function Confirm() {
  const { user, onSubmit } = useCreateForm()
  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Forms>()
  const inputValues = getValues()

  return (
    <Container maxW="container.sm">
      <Heading as="h1" mb="24px">
        Form Confirm
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="16px">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            {inputValues.name}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            {inputValues.email}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="country">Country</FormLabel>
            {inputValues.country}
          </FormControl>
          {user.memberStatus !== 'none' ? (
            <FormControl>
              <FormLabel htmlFor="memberStatus">Member Status</FormLabel>
              {inputValues.memberStatus}
            </FormControl>
          ) : null}
        </VStack>
        <ButtonGroup spacing="6" mt={4}>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  )
}
