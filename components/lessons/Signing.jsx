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
} from "@chakra-ui/react";
import { VideoCapture } from "./VideoCapture";

export const Signing = () => {
  return (
    <>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="6" marginTop="3rem">
          <Tabs isFitted>
            <TabList>
              <Tab>P</Tab>
              <Tab>E</Tab>
              <Tab>N</Tab>
              <Tab>I</Tab>
              <Tab>S</Tab>
            </TabList>
          </Tabs>

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
