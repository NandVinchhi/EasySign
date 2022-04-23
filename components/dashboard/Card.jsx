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
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import * as React from "react";

export const Card = () => {
  return (
    <Box
      as="section"
      py={{
        base: "4",
        md: "8",
      }}
    >
      <Container maxW="3xl">
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
              <Text fontSize="lg" fontWeight="bold">
                Lesson 1
              </Text>
              <Progress hasStripe value={80} />
              <Text fontSize="md" fontWeight="light">
                Level 4: You're almost there! Only {32} points left to go!
              </Text>
            </Stack>
            <Center>
              <Stack
                direction={{
                  base: "column",
                  md: "row",
                }}
                spacing="5"
              >
                <Stack spacing="1">
                  <Text fontSize="sm" align="center">
                    Label 1
                  </Text>
                  <CircularProgress value={70}>
                    <CircularProgressLabel>70</CircularProgressLabel>
                  </CircularProgress>
                </Stack>

                <Stack spacing="1">
                  <Text fontSize="sm" align="center">
                    Label 2
                  </Text>
                  <CircularProgress value={80}>
                    <CircularProgressLabel>80</CircularProgressLabel>
                  </CircularProgress>
                </Stack>

                <Stack spacing="1">
                  <Text fontSize="sm" align="center">
                    Label 3
                  </Text>
                  <CircularProgress value={20}>
                    <CircularProgressLabel>20</CircularProgressLabel>
                  </CircularProgress>
                </Stack>

                <Stack spacing="1">
                  <Text fontSize="sm" align="center">
                    Label 4
                  </Text>
                  <CircularProgress value={40}>
                    <CircularProgressLabel>40</CircularProgressLabel>
                  </CircularProgress>
                </Stack>
              </Stack>
            </Center>

            <Stack spacing="5">
              <Button
                colorScheme="green"
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
