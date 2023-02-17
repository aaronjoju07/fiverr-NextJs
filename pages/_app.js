import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';
import useAuth from '../hooks/useAuth';
import "../styles/globals.css"
import AuthCheck from './AuthCheck';


export default function App({ Component, pageProps }) {
  const { loading, user } = useAuth();

  if(loading) return (<ChakraProvider> <Loading /></ChakraProvider>)
  if(!user) return (<ChakraProvider> <AuthCheck /></ChakraProvider>)
  return (

  <ChakraProvider>
  <Navbar />
    <Component {...pageProps} />
  </ChakraProvider>)
}
