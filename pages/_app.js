import { ChakraProvider } from '@chakra-ui/react'
import useAuth from '../hooks/useAuth';
import "../styles/globals.css"
import AuthCheck from './AuthCheck';

export default function App({ Component, pageProps }) {
  const { isLoggedIn, user } = useAuth();
  if(!user) return (<ChakraProvider> <AuthCheck /></ChakraProvider>)
  return (

  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>)
}
