import { Box, Image, Badge, Text, Button } from '@chakra-ui/react';

const GigCArd = ({ gig }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src="https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/213867622/original/f9399212c3be919558bf9bb619e0cf195ae6eb98.jpg" alt="title" />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            category
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            time delivery
          </Box>
        </Box>

        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          Title
        </Text>

        <Text mt="2" fontSize="sm" color="gray.500">
          description
        </Text>

        <Box d="flex" mt="2" alignItems="center">
          <Text fontWeight="semibold" as="h4" fontSize="lg">
            $100
          </Text>
          <Button ml="auto" colorScheme="blue">
            Order now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default GigCArd;