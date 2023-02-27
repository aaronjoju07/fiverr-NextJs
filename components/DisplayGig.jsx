import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { CldImage } from 'next-cloudinary'
import React from 'react'

const DisplayGig = () => {
  return (
    <Box
      display='flex'
      flexDirection='row'
    >
      {/* <Image src='/123.png' boxSize={240} /> */}
      <CldImage
        width="360"
        height="200"
        src="v1664333570/cld-sample-3.jpg"
        alt=''
        sizes="50vw"
      />
      <Stack>
        <Heading>Title</Heading>
        <Text>Description</Text>
        <Text>Subject</Text>
        <Text>Notify</Text>
        <Text
          leftIcon={3}
        >30 days</Text>
        <Text>tags</Text>
        <Text>₹500</Text>
      </Stack>

    </Box>
  )
}

export default DisplayGig
