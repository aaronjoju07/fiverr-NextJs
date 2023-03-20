import React from 'react'
import { Avatar, Box, Button, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import useAuth from '../hooks/useAuth';
import Profile from '../components/Profile';
import DisplayGig from '../components/DisplayGig';
import Link from 'next/link';

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
                <Text>{use.email}</Text>
                <Box h={3}></Box>
                {/* <Text fontWeight="bold">Phone</Text> */}
                <Link href={'/addGig'}>
                <Button  p={3} w={'100%'}>Gig & Project</Button>
                </Link>
                </Box>
            </SimpleGrid>
        </Box>
        </>
    )
}

export default profile
