import { Fragment, useRef, useState } from 'react';
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Button,
    useColorModeValue,
    VStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Box,
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { BidProject, createProject } from '../../pages/api/projects';

const Bid = ({ prjid }) => {
    const [user] = useAuthState(auth);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [estPrice, setEstPrice] = useState()
    const [desc, setDesc] = useState()
    const cancelRef = useRef()
    const [loading, setLoading] = useState()

    const AddButton = async () => {
        const projectDetails = {
            estPrice, desc, postedUser: user.uid, postedEmail: user.email, postedUserPic: user.photoURL, prjid,
        }
        setLoading(true)
        BidProject(projectDetails)
        setDesc("")
        setEstPrice("")
        onClose()
        setLoading(false)
    }
    return (

        <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
            <Box display='flex' justifyContent='center'>
                <Button colorScheme='gray' variant={'ghost'} onClick={onOpen}>Bid</Button>
            </Box>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Bid
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Stack spacing={10}>
                                <VStack
                                    as="form"
                                    spacing={8}
                                    w="100%"
                                    bg={useColorModeValue('white', 'gray.700')}
                                    rounded="lg"
                                    boxShadow="sm"
                                >
                                    <VStack spacing={4} w="100%">
                                        <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                                            <FormControl id="email">
                                                <FormLabel>Estimated Price</FormLabel>
                                                <Input value={estPrice} onChange={(e) => setEstPrice(e.target.value)} type="number" required placeholder="" rounded="md" />
                                            </FormControl>
                                        </Stack>
                                        <FormControl id="message">
                                            <FormLabel>Description</FormLabel>
                                            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} size="lg" required placeholder="" rounded="md" />
                                        </FormControl>
                                    </VStack>
                                </VStack>
                            </Stack>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='green' onClick={() => AddButton()} ml={3}>
                                Post
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Container>
    );
};

export default Bid;
