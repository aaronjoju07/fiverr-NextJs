import { ChakraProvider } from '@chakra-ui/react'
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import "../styles/globals.css"
import AuthCheck from './AuthCheck';

export default function App({ Component, pageProps }) {
  const { loading, user } = useAuth();
  if(!user) return (<ChakraProvider> <AuthCheck /></ChakraProvider>)
  if(loading) return (<ChakraProvider> <Loading /></ChakraProvider>)
  return (

  <ChakraProvider>
  <Navbar />
    <Component {...pageProps} />
  </ChakraProvider>)
}
