import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { extendTheme } from '@chakra-ui/react'

const firebaseConfig = {
  apiKey: "AIzaSyB0FFNacsRX4WbZHuft-_IoXaIEnQXp4bQ",
  authDomain: "learnisl.firebaseapp.com",
  projectId: "learnisl",
  storageBucket: "learnisl.appspot.com",
  messagingSenderId: "525235546459",
  appId: "1:525235546459:web:e8bea1ff146e1e0afad27e",
  measurementId: "G-M3W91N52H5"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


function MyApp({ Component, pageProps }) {

  return <ChakraProvider><Head><title>EasySign - Learn Indian Sign Language Online</title></Head><Component {...pageProps} /></ChakraProvider>
}

export default MyApp
