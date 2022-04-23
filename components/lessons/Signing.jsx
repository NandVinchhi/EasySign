import React, {useState, useEffect} from "react";
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
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { VideoCapture } from "./VideoCapture";

export const Signing = (props) => {

  const [letter, setLetter] = useState(0);
  const [status, setStatus] = useState(props.question.length == 3 ? [1, 0, 0]: [1, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [isHint, setIsHint] = useState(false);

  const nextLetter = (result) => {
    let tempStatus = status;
    if (result == 1){
      if (isHint){
        setScore(score + 1);
        tempStatus[letter] = 3;
      }
      else {
        setScore(score + 2);
        tempStatus[letter] = 2;
      }
    }
    else {
      tempStatus[letter] = 4;
    }

    setIsHint(false);

    if (letter >= props.question.length - 1){
      props.updateScore(score);
    }
    else {
      tempStatus[letter + 1] = 1
      setLetter(letter + 1);
    }

  }

  // 0 - nothing, 1 - selected, 2 - green, 3 - orange, 4 - red
  return (
    <>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="6" marginTop="3rem">
          <Center>
            <HStack>
            {props.question.toUpperCase().split("").map((k, i) => {
              let s = status[i]

              if (s == 0){
                return (<Box h="10" w="10" p="2" borderRadius="3"><Center><Text  fontWeight="extrabold">{k}</Text></Center></Box>)
              }
              else if (s == 1){
                return (<Box h="10" w="10" p="2" borderRadius="3" border="2px"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }

              else if (s == 2){
                return (<Box h="10" w="10" p="2" bg="green.500" color="white" borderRadius="3"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }
              else if (s == 3){
                return (<Box h="10" w="10" p="2" bg="orange.500" color="white" borderRadius="3"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }
              else if (s == 4){
                return (<Box h="10" w="10" p="2" bg="red.500" color="white" borderRadius="3"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }
            })}
            
          </HStack>
          </Center>
          

          <VideoCapture />

          <Center><Text fontWeight="bold" fontSize="2xl">Sign the letters of the above word.</Text></Center>
          
          <Center>
            <HStack>
              <Button size="lg" colorScheme="orange" alignSelf="center">
                Show Hint
              </Button>
              <Button onClick={() => nextLetter(0)} size="lg" colorScheme="red" alignSelf="center">
                Skip
              </Button>
            </HStack>
          </Center>
          <Center><Progress width="xl" value={parseInt(100 * props.questionNumber / 11)} hasStripe /></Center>
          <Center><Text fontWeight="bold" color="blue.600" fontSize="2xl">{props.questionNumber}/11</Text></Center>
        </Stack>
      </Center>
    </>
  );
};
