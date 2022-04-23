import {
  Box,
  Button,
  Container,
  Center,
  Stack,
  Icon,
  Text,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import * as React from "react";
import { CircularProgressBar } from "./CircularProgressBar";

export const Card = () => {
  return (
    <Box
      as="section"
      py={{
        base: "4",
        md: "8",
      }}
    >
      <Container maxW="7xl">
        <Box
          bg="bg-surface"
          boxShadow={useColorModeValue("sm", "sm-dark")}
          borderRadius="lg"
          p={{
            base: "4",
            md: "6",
          }}
        >
          <Stack spacing="5">
            <Stack spacing="3">
              <Text fontSize="2xl" fontWeight="bold">
                Alphabets in ISL
              </Text>

              <Text fontSize="md" >
                StrengtLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>

              <Progress hasStripe value={80} />
              <Text fontSize="md" fontWeight="light">
                Level 4: You're almost there! Only {32} points left to go!
              </Text>
            </Stack>
            <Center>
              <Stack
                direction={{
                  base: "row",
                  md: "row",
                }}
                spacing="5"
              >
                <CircularProgressBar score={80} label="Label 1" />
                <CircularProgressBar score={40} label="Label 2" />
                <CircularProgressBar score={20} label="Label 3" />
                <CircularProgressBar score={70} label="Label 4" />
              </Stack>
            </Center>

            <Stack spacing="5">
              <Button
                colorScheme="blue"
                variant="solid"
                rightIcon={<Icon as={MdArrowForward} />}
              >
                Start Lesson
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
