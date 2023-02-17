import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <Box display='flex' align="center" justify="space-between" >
        <Spinner size='xl' />
    </Box>
  )
}

export default Loading
