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
import React, { useState, useEffect } from 'react'

import { GoogleIcon } from '../components/ProviderIcons'
import { NavbarLanding } from "../components/navbar/NavbarLanding";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function App (){
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSignup = () => {
    setLoading(true);
    setErrorMessage("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        setErrorMessage(error.message);
        // ..
      });
  }
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
            <Input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" type="email" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" type="password" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <Input id="password" value={confirm}  onChange={e => setConfirm(e.target.value)} placeholder="********" type="password" />
          </FormControl>
        </Stack>
        
        <Stack spacing="4">
          <Button colorScheme="blue" onClick={onSignup} disabled={loading || email.length == 0 || password.length == 0 || confirm !== password}>{loading ? "Loading...":"Sign up"}</Button>
          {password.length > 0 && confirm.length > 0 && password !== confirm && (
            <Text fontSize="sm" color="red.500">
            Passwords must match.
          </Text>
          )}
          <Text fontSize="sm" color="red.500">
            {errorMessage}
          </Text>
          
          <HStack>
          <Divider />
          <Text fontSize="sm" color="muted">
            OR
          </Text>
          <Divider />
        </HStack>
          <Button disabled={loading} variant="outline" bg="white" colorScheme="gray" leftIcon={<GoogleIcon boxSize="5" />} iconSpacing="3">
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