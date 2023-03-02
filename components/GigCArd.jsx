import { Box, Image, Badge, Text, Button, useColorModeValue, Flex } from '@chakra-ui/react';

const GigCArd = ({ gig }) => {
  return (   
         <Box p="5" maxW="320px" borderWidth="1px" marginLeft={"1rem"}>
        <Image borderRadius="md"  src={gig.thumbnail} alt="pic" height={"13rem"} width={"18rem"} />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {gig.title}
        </Text>
        <Text mt={2}>₹{gig.price}</Text>
        <Flex mt={2} align="center">
          <Box  color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>4.84</b> (190)
          </Text>
        </Flex>
      </Box>
  );
};
export default GigCArd;