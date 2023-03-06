import { Alert, Box, Divider, Heading, Image, Skeleton, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import { CldImage } from 'next-cloudinary'
import React from 'react'

const DisplayGig = ({ gig }) => {
  return (
    <>


      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'md'}
        rounded={'lg'}
        justifyContent='center'
        alignContent='center'
        width='60%' height='auto'
        display='flex'
        flexDirection='row'
        backgroundColor={'gray.200'}
      >
        {gig ? <Image pb={2} src={gig.thumbnail} alt='f' height="350" width="100" boxShadow={'sm'}
          roundedBottom={'md'} /> : <Skeleton height="350" width="100" boxShadow={'sm'}
            roundedBottom={'md'} ></Skeleton>}
        <Stack p={6} rounded='lg'
        >
          <Heading>{gig.title}</Heading>
          <Text>{gig.description}</Text>
          <Text>{gig.subject}</Text>
          <Box display='flex' alignItems='center'>
            <BellAlertIcon height={18} />
            <Text>{gig.notification}</Text>
          </Box>
          <Text
            leftIcon={3}
          >{gig.timeDuration}</Text>
          {
            gig.benefitTags.map((tags) => (
              <Text>{tags}</Text>
            ))
          }
          <Text>₹{gig.price}</Text>
        </Stack>
      </Box>
    </>
  )
}

export default DisplayGig
