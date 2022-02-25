import {
  Box,
  Button,
  Flex,
  HStack,
  useColorModeValue as mode,
  useDisclosure,
  VisuallyHidden,
} from '@chakra-ui/react'
import * as React from 'react'
import { Image } from '@chakra-ui/react'

import { NavLink } from './NavLink'
import { NavMenu } from './NavMenu'



const DesktopNavContent = (props) => {
  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Box mt="3" mb="3" as="a" href="/" rel="home">
        <VisuallyHidden>EasySign</VisuallyHidden>
        <Image h="8" src="/logo.png" />
      </Box>
      
      <HStack spacing="8" justify="space-between">
        <Box as="a" href="/login" color={mode('blue.600', 'blue.300')} fontWeight="bold">
          Log In
        </Box>
        <Button as="a" href="/signup" colorScheme="blue" fontWeight="bold">
          Sign Up
        </Button>
      </HStack>
    </Flex>
  )
}

const MobileNavContent = (props) => {
  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Box mt="3" mb="3" as="a" href="/" rel="home">
        <VisuallyHidden>EasySign</VisuallyHidden>
        <Image h="8" src="/logo.png" />
      </Box>
      

    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContent,
  Desktop: DesktopNavContent,
}