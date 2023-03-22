import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Sidebar from '../components/Chat/Sidebar'

export default function Chat() {
  return (
    <div>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/123.svg" />
      </Head>
      <Box display={'flex'}>
      <Box h="100vh">
        <Sidebar />
      </Box>
      <Box justifyContent={'center'}
      alignItems='center'
      display={'flex'}
      width={'100%'}
      >
      <Text>Chat!!</Text>
      </Box>
      </Box>
      
    </div>
  )
}
