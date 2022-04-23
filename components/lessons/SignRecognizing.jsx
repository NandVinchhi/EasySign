import React, {useState, useEffect} from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
import {
  Image,
  Center,
  Stack,
  Input,
  Button,
  Progress,
  HStack,
  Text
} from "@chakra-ui/react";

export const SignRecognizing = (props) => {
  return (
    <>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="10" mt="4">
          <Image
            src="http://www.milwaukeeindependent.com/wp-content/uploads/2019/06/062719_SignLanguage_01.jpg"
            alt="Sign"
            w="xl"
          />
          <Center><Text fontWeight="bold" fontSize="2xl">Enter the alphabet signed above.</Text></Center>
          
          <HStack>

          <Input
            placeholder="Enter your answer"
            size="lg"
            alignSelf="center"
          />

         
          <Button size="lg" colorScheme="blue" alignSelf="center">
            Submit
          </Button>
          </HStack>

          <Progress width="xl" value={parseInt(100 * props.questionNumber / 11)} hasStripe />
          <Center><Text fontWeight="bold" color="blue.600" fontSize="2xl">{props.questionNumber}/11</Text></Center>

        </Stack>
      </Center>
    </>
  );
};
