import React, {useState, useEffect} from "react";
import { Card } from "../components/dashboard/Card";
import { NavbarLanding } from "../components/navbar/NavbarLanding";
import { useRouter } from 'next/router'
import { getAuth } from "firebase/auth"
import {
  Box,
  Flex
} from "@chakra-ui/react";
export default function App() {
  const router = useRouter()
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        router.push("/login")
      } 
    });
  }, [])
  return (
    <Box bg="gray.50" minHeight="100vh" h="full" pb="7">
      <NavbarLanding />
      
      <Card />
      <Card />
      
      
    </Box>
  );
}
