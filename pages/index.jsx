import {
  Box,
  Button,
  Heading,
  Img,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiPlay } from 'react-icons/hi'
import { NavbarLanding } from '../components/navbar/NavbarLanding.jsx'
import { Features } from "../components/features/Features.jsx"

export default function App() {
  return (
    <>

    <NavbarLanding/>
    <Box as="section" bg={mode('gray.50', 'gray.800')} pt="16" pb="24">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '3rem', lg: '2rem' }}
          mt="8"
          align={{ lg: 'center' }}
          justify="space-between"
        >
          <Box flex="1" maxW={{ lg: '520px' }}>
            
            <Heading
              as="h1"
              size="2xl"
              color={mode('blue.600', 'blue.300')}
              mt="8"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              #1 Interactive Platform to Learn Indian Sign Language.
            </Heading>
            <Text color={mode('gray.600', 'gray.400')} mt="4" fontSize="lg" fontWeight="medium">
              We pair AI technology with curated materials to ensure the best possible learning experience.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing="4" mt="8">
              <Button size="lg" minW="210px" colorScheme="blue" height="14" px="8">
                Sign Up to Get Started
              </Button>
              
            </Stack>
            <Text mt="8" color={mode('gray.600', 'gray.400')}>
              Already have an account?{' '}
              <Link href="#" textDecoration="underline">
                Log in
              </Link>
            </Text>
          </Box>
          <Box pos="relative" w={{ base: 'full', lg: '650px' }} h={{ base: 'auto' }}>
            <Img
              w="full"
              pos="relative"
              zIndex="1"
              h={{ lg: '100%' }}
              objectFit="cover"
              src="/laptop.png"
              alt="Screening talent"
            />
            
          </Box>
        </Stack>
      </Box>
      
    </Box>
    <Features/>

    </>
  )
}