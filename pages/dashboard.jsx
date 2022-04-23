import React, {useState, useEffect} from "react";
import { Card } from "../components/dashboard/Card";
import { NavbarLanding } from "../components/navbar/NavbarLanding";
import { useRouter } from 'next/router'
import { getAuth } from "firebase/auth"
import {
  
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
    <>
      <NavbarLanding />
      
      <Card />
      <Card />
      
    </>
  );
}
