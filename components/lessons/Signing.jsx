import * as React from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
import {
  Center,
  Stack,
  Button,
  Progress,
  Tab,
  Tabs,
  TabList,
  Text,
  HStack
} from "@chakra-ui/react";
import { VideoCapture } from "./VideoCapture";

export const Signing = () => {
  return (
    <>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="6" marginTop="3rem">
          <HStack>
            <Button style={{cursor: "default"}} _hover={{background: "green.500"}} colorScheme="green" bg="green.500" w="10">H</Button>
            <Button colorScheme="green" bg="green.500" w="10">E</Button>
            <Button colorScheme="green" bg="green.500" w="10">L</Button>
            <Button colorScheme="green" bg="green.500" w="10">L</Button>
          </HStack>

          <VideoCapture />

          <Button colorScheme="blue" size="md" alignSelf="center">
            Submit
          </Button>

          <Progress width="xl" value={20} hasStripe alignSelf="center" />
        </Stack>
      </Center>
    </>
  );
};
