import * as React from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
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
    Spacer
} from "@chakra-ui/react";

export const Score = () => {
    return (
        <>
        <NavbarLanding />
        <Center>
          <Stack padding="4" spacing="6" marginTop='3rem'>
            <Stat w='692px' h='160px' border='1px' borderColor='#E2E8F0' borderRadius='12px' padding='24px'>
                <StatLabel>Your Score</StatLabel>
                <Center>
                    <StatNumber>4/5</StatNumber>
                </Center>
            </Stat>
            <Spacer /> 
            <Flex direction={'column'} align='center'>
                <Button w='132px' h='40px' colorScheme={'blue'}>View Results</Button>
            </Flex>            
          </Stack>
        </Center>
      </>
    );
  };