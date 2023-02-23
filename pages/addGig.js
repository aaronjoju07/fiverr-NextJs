import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import AddGig from '../components/AddGig'
import ImageInput from '../components/ImageInput'
import TagsInput from '../components/TagsInput'

const addGig = () => {
  return (

    <Box
    display='flex'
    flexDirection='column'
    alignItems='center'
    >
    <Text>
      GIG 
    </Text>
      <AddGig />
    </Box>


  )
}

export default addGig
