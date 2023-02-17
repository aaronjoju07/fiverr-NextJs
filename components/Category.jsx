import { Grid, Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
const CategoryButtons = () => {
  return (
    <Box bg={useColorModeValue('white', 'gray.900')}
    boxShadow={'md'}
    rounded={'lg'}>
    <Text fontSize='xl' as='i' p={5} >Category</Text>
    <Grid
    p={4}
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      gap={4} justifyItems='center'
    >
      <Box width="100%"  >
      
        <Button
        width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Graphics & Design
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Programming & Tech
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Music & Audio
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Video & Animation
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Writhing & Translation
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Self Improvement
        </Button>
      </Box>
    </Grid>
    </Box>
  );
};

export default CategoryButtons;