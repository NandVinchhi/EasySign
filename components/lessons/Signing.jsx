import React, {useState, useEffect, useReducer } from "react";
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
  ModalCloseButton,
  Image
} from "@chakra-ui/react";
import { VideoCapture } from "./VideoCapture";
import { referenceData } from "./RecordedSigns";
export const Signing = (props) => {


  function reducer (status, action){
    return {value: action.value}
  }
  const [status, setStatus] = useState(props.question.length == 3 ? [1, 0, 0]: [1, 0, 0, 0]);

  // const [status, setStatus] = useState(props.question.length == 3 ? [1, 0, 0]: [1, 0, 0, 0]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  
  const [isOpen, setIsOpen] = useState(false);
  let queue = 0;
  let score = 0;
  let isHint = false;

  const getLetter = (k) => {
    const final = 0;
    for (let i = 0; i < k.length; i++){
      if (k[i] == 1){
        final = i;
      }
    }

    return final
  }

  const nextLetter = (result) => {
    queue = 0;
    let tempStatus = status;
    let tempLetter = getLetter(tempStatus);
    if (result == 1){
      if (isHint){
        score += 1;
        tempStatus[tempLetter] = 3;
      }
      else {
        score += 2
        tempStatus[tempLetter] = 2;
      }
    }
    else {
      tempStatus[tempLetter] = 4;
    }

    isHint = false;

    if (tempLetter >= props.question.length - 1){
      props.updateScore(score);
    }
    else {
      tempStatus[tempLetter + 1] = 1

      setStatus(tempStatus);
      forceUpdate();
      
      
    }

  }

  const compare = (a, b) => {
    for (let i = 0; i < a.length; i++){
      if (Math.abs(a[i] - b[i]) > 60){
        return false;
      }
    }

    return true;
  }

  const validate = (data) => {
    let letterData = referenceData[props.question[getLetter(status)].toUpperCase()]

    if (letterData.length == 1 && data.length == 1){
      return compare(letterData[0], data[0]);
    }
    else if (letterData.length == 2 && data.length == 2){
      // console.log("")
      // console.log(compare(letterData[0], data[0]))
      // console.log(compare(letterData[1], data[1]))
      // console.log(compare(letterData[1], data[0]))
      // console.log(compare(letterData[0], data[1]))
      return (compare(letterData[0], data[0]) && compare(letterData[1], data[1])) || (compare(letterData[0], data[1]) && compare(letterData[1], data[0]))
    }
    else if (letterData.length == 1 && data.length == 2){
      return compare(letterData[0], data[1]) || compare(letterData[0], data[0])
    }

    else {
      return false;
    }
  }


  const updateData = (data) => {
    let decision = validate(data);
    
    
    if (decision){
      // console.log(decision)
      queue += 1;
      if (queue + 1 > 10){
        nextLetter(1);
      }
    }
    else {
      queue = 0;
    }
    
  }


  return (
    <>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Hint</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={"/isl/" + props.question[getLetter(status)].toUpperCase() + ".png"} w="full" mb="5"/>
            </ModalBody>
            
          </ModalContent>
        </Modal>
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
          

          <VideoCapture updateData={updateData} letter={props.question[getLetter(status)].toUpperCase()}/>

          
          <Center><Text fontWeight="bold" fontSize="2xl">Sign the letters of the above word.</Text></Center>

          
          <Center>
            <HStack>
              <Button onClick={() => {
                isHint = true;
                setIsOpen(true);
              }} size="lg" colorScheme="orange" alignSelf="center">
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
