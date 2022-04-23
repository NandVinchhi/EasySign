import * as React from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
import CountUp from 'react-countup';
import {
    chakra,
    Stat,
    Stack,
    Box,
    Flex,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    calc,
    Center,
    Button,
    Spacer,
    Heading
} from "@chakra-ui/react";

export const Score = () => {
    return (
        <>
        <NavbarLanding />
        <Center>
          <Stack padding="4" spacing="6" marginTop='3rem'>
            <Center><Heading size="lg" mt="4">Your score is</Heading></Center>
            <Center><Heading color="teal.500" size="4xl" mt="2"><CountUp start={1} end={100} duration={2} />%</Heading></Center>
            <Center><Heading size="sm" mt="4">You received 50 points.</Heading></Center>
            <Button size="lg" as="a" href="/dashboard" colorScheme={'blue'}>Go to Dashboard</Button>  
            
            
                     
          </Stack>
        </Center>
      </>
    );
  };