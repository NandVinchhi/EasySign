import * as React from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
import {
  Image,
  Center,
  Stack,
  Input,
  Button,
  Progress,
} from "@chakra-ui/react";

export const SignRecognizing = () => {
  return (
    <>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="6" marginTop="3rem">
          <Image
            src="http://www.milwaukeeindependent.com/wp-content/uploads/2019/06/062719_SignLanguage_01.jpg"
            alt="Sign"
            w="xl"
          />
          <Input
            placeholder="Enter your alphabet"
            size="lg"
            alignSelf="center"
          />

          <Button colorScheme="blue" size="md" alignSelf="center">
            Submit
          </Button>

          <Progress width="xl" value={20} hasStripe />
        </Stack>
      </Center>
    </>
  );
};
