import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'
import { RiseLoader } from 'react-spinners'
import Logo from './Logo'

const Loading = () => {
  return (
    <Box
    
    display="flex"
    flexDirection='column'
    alignItems="center"
    justifyContent="center"
    height="100vh"
  >
  <Logo />
  <RiseLoader
  size={10}
 />
    {/* <Spinner size="xl" color="blue.500" /> */}
  </Box>
  )
}

export default Loading
