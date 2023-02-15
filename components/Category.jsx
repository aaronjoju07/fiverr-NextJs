import { Grid, Box, Button } from "@chakra-ui/react";

const CategoryButtons = () => {
  return (
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
          Category 1
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Category 2
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Category 3
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Category 4
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Category 5
        </Button>
      </Box>
      <Box width="100%">
        <Button width="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 2, md: 3 }}>
          Category 6
        </Button>
      </Box>
    </Grid>
  );
};

export default CategoryButtons;