import React from 'react'
import { Avatar, Box, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import useAuth from '../hooks/useAuth';
import Profile from '../components/Profile';

const profile = ({use}) => {
    
    return (
        <>

        <Box px="4">
            <Center my="8">
                <Avatar size="2xl" name={use.displayName} src={use.photoURL} />
            </Center>
            <Heading as="h1" mb="4" fontSize="4xl" textAlign="center">
                {use.displayName}
            </Heading>
            <SimpleGrid
                display="flex"
                flexDirection='column'
                alignItems="center"
                justifyContent="center"
              >
                <Box>
                <Text fontWeight="bold">Email</Text>
                <Text>{use.email}
                </Text>
                <Text fontWeight="bold">Phone</Text>
                <Text>(555) 555-5555</Text>
                </Box>
            </SimpleGrid>
        </Box>
        </>
    )
}

export default profile
