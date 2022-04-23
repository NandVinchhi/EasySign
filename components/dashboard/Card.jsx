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
  HStack,
  VStack,
  Tooltip 

} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import * as React from "react";
import { CircularProgressBar } from "./CircularProgressBar";

export const Card = () => {
  return (
    <Box
      as="section"
      pt={{
        base: "4",
        md: "8",
      }}
    >
      <Container maxW="7xl">
        <Box
          bg="white"
          boxShadow={useColorModeValue("sm", "sm-dark")}
          borderRadius="lg"
          p={{
            base: "4",
            md: "6",
          }}
        >
          
            
              <Text fontSize="2xl" fontWeight="bold">
                Alphabets in ISL
              </Text>

              <Text fontSize="md" mt="1">
                Start your journey by learning the fundamental building blocks of Indian Sign Language. This lesson will cover all 26 alphabets.
              </Text>

              <Progress hasStripe value={80} mt="4"/>
              <HStack spacing="1" justify="space-between" mt="2">
                <Text color="blue.600" fontSize="lg" fontWeight="bold">
                  Level 4
                </Text>
                <Text color="blue.600" fontSize="lg" fontWeight="bold">
                  ⚡ 250 / 300
                </Text>
                <Text color="blue.600" fontSize="lg" fontWeight="bold">
                  Level 5
                </Text>
              </HStack>

              
              <HStack spacing="1" justify="space-between" mt="6">
                <Center>
                <Tooltip label="Your most recent scores in this lesson" aria-label='A tooltip'>

                  <Stack
                    direction="row"
                    spacing="5"
                    style={{cursor: "pointer"}}
                  >
                    <CircularProgressBar score={80}/>
                    <CircularProgressBar score={40}/>
                    <CircularProgressBar score={20}/>
                    <CircularProgressBar score={70}/>
                  </Stack>
                </Tooltip>
                </Center>
                <Button
                  colorScheme="teal"
                  size="lg"
                  variant="solid"
                  rightIcon={<Icon as={MdArrowForward} />}
                >
                  Start lesson
                </Button>
              </HStack>

              
            
            

            
              
            
         
        </Box>
      </Container>
    </Box>
  );
};
