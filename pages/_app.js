import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import {  db } from '../firebase';
import useAuth from '../hooks/useAuth';
import "../styles/globals.css"
import AuthCheck from './AuthCheck';

// import  {useAuthState}  from 'react-firebase-hooks';


export default function App({ Component, pageProps }) {
  const { loading, user } = useAuth();

  // const [user] = useAuthState(auth);
  if(loading) return (<ChakraProvider> <Loading /></ChakraProvider>)
  if(!user) return (<ChakraProvider> <AuthCheck /></ChakraProvider>)
  return (

  <ChakraProvider>
  <Navbar />
    <Component use={user} {...pageProps} />
  </ChakraProvider>)
}
