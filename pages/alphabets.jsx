import { SignRecognizing } from "../components/lessons/SignRecognizing";
import { Signing } from "../components/lessons/Signing";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { words3 } from "./data";
import { words4 } from "./data";
export default function App() {
  const router = useRouter();
  const auth = getAuth();
  const getRandom = (arr, n) => {
      let result = new Array(n)
      let len = arr.length
      let taken = new Array(len);
      
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
  }

  const levels = ["aeibcd", "aeibcdrstf", "aeibcdrstfmnop", "aeibcdrstfmnopuvgh", "aeibcdrstfmnopuvgh", "aeibcdrstfmnopuvghjklw", "aeibcdrstfmnopuvghjklwqxyz"]
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);
  return (
    <>
      <Signing />
    </>
  );
}
