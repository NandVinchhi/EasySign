import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Image,
  useBreakpointValue,
  Center,
  Box,
  Divider,
  Link
} from '@chakra-ui/react'
import * as React from 'react'

import { GoogleIcon } from '../components/ProviderIcons'
import { NavbarLanding } from "../components/navbar/NavbarLanding";

export default function App (){
  return (
  <>
  <NavbarLanding/>
  <Divider/>
  
    
  
  <Container
    maxW="md"
    py={{
      base: '12',
      md: '24',
    }}
  >
    <Stack spacing="8">
      <Stack spacing="6">
        <Center mb={3}>
          <Image src="/logo.png" w="40%" h="40%"/>
        </Center>
        <Stack
          spacing={{
            base: '2',
            md: '3',
          }}
          textAlign="center"
        >
          <Heading
            size={"lg"}
            
          >
            Sign up to get started
          </Heading>
          <Text color="gray.600">Start learning Indian Sign Language today</Text>
          
        </Stack>
      </Stack>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" placeholder="Enter your email" type="email" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" placeholder="********" type="password" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <Input id="password" placeholder="********" type="password" />
          </FormControl>
        </Stack>
        
        <Stack spacing="4">
          <Button colorScheme="blue">Sign up</Button>
          <HStack>
          <Divider />
          <Text fontSize="sm" color="muted">
            OR
          </Text>
          <Divider />
        </HStack>
          <Button variant="outline" bg="white" colorScheme="gray" leftIcon={<GoogleIcon boxSize="5" />} iconSpacing="3">
            Continue with Google
          </Button>
        </Stack>
      </Stack>
      <HStack spacing="1" justify="center">
        <Text fontSize="sm" color="muted">
          Already have an account?
        </Text>
        <Button variant="link" as="a" href="/login" colorScheme="blue" size="sm">
          Log in
        </Button>
      </HStack>

    </Stack>
    <Text mt="6" fontSize="sm">* By signing up, I agree to the <Link color="blue.600" href="/terms" >terms of service</Link> and <Link color="blue.600" href="/privacy" >privacy policy</Link>. Please note that EasySign requires a laptop/desktop with a webcam and minimum 4GB RAM.</Text>
  </Container>
  
  </>
)}