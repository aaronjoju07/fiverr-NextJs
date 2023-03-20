import { chakra, Icon, Avatar, Box, Divider, Heading, HStack, Image, Link, Skeleton, Stack, Text, Tooltip, useColorModeValue, Card, CardBody } from '@chakra-ui/react'
import React from 'react'

const DisplayGig = ({ gig }) => {
  return (
    <>

      {gig ?
        ( <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        w={'40%'}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={gig.thumbnail}
          alt='Caffe Latte'
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{gig.title}</Heading>
            <Stack>
              <Text fontSize="md" color="gray.500">Subject : {gig.subject},{gig.description}</Text>
              <Text fontSize="md" color="gray.500">{gig.timeDuration}</Text>
              <Divider />
              <Text fontSize="md" color="gray.500">
                Benefits
              </Text>
              {gig.benefitTags.map((tags) => (<Text>{tags}</Text>))}
              <Text>₹{gig.price}</Text>
            </Stack>
          </CardBody>
        </Stack>
      </Card>
        ) : (null)}

     
    </>

  )
}

export default DisplayGig
