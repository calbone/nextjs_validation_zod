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
  Radio,
  RadioGroup,
  Select,
  Stack,
  VStack,
} from '@chakra-ui/react'

import type { MemberStatus } from '@/states/userState'

import { useCreateForm } from './useCreateForm'

const contries = [
  { value: '1', name: 'United Arab Emirates' },
  { value: '2', name: 'Nigeria' },
]

const memberStatus = [
  { name: 'GOLD', type: 'gold' },
  { name: 'SILVER', type: 'silver' },
  { name: 'BRONZE', type: 'bronze' },
]

const getMemberStatusValue = (status: MemberStatus) => {
  for (let member of memberStatus) {
    if (member.type === status) return member.type
  }
}

export default function Form() {
  const { user, handleSubmit, register, errors, isSubmitting, onSubmit } =
    useCreateForm()
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
          {user.memberStatus !== 'none' ? (
            <FormControl isInvalid={!!errors.memberStatus}>
              <FormLabel htmlFor="memberStatus">Member Status</FormLabel>
              <RadioGroup
                defaultValue={getMemberStatusValue(user.memberStatus)}
              >
                <Stack direction="row">
                  {memberStatus.map((status, index) => (
                    <Radio
                      key={index}
                      value={status.type}
                      {...register('memberStatus')}
                      isDisabled={status.type !== user.memberStatus}
                    >
                      {status.name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.memberStatus && errors.memberStatus?.message}
              </FormErrorMessage>
            </FormControl>
          ) : null}
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
