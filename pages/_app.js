import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider><Head><title>EasySign - Learn Indian Sign Language Online</title></Head><Component {...pageProps} /></ChakraProvider>
}

export default MyApp
