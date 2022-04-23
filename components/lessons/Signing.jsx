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
  HStack,
  Box
} from "@chakra-ui/react";
import { VideoCapture } from "./VideoCapture";

export const Signing = () => {
  return (
    <>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="6" marginTop="3rem">
          <Center>
            <HStack>
          
            <Box h="10" w="10" p="2" bg="green.500" color="white" borderRadius="3"><Center><Text fontSize="lg" fontWeight="extrabold">D</Text></Center></Box>
            <Box h="10" w="10" p="2" bg="green.500" color="white" borderRadius="3"><Center><Text fontSize="lg" fontWeight="extrabold">D</Text></Center></Box>
            <Box h="10" w="10" p="2" bg="green.500" color="white" borderRadius="3"><Center><Text fontSize="lg" fontWeight="extrabold">D</Text></Center></Box>
          </HStack>
          </Center>
          

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
