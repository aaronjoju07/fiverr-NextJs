import { Fragment, useRef, useState } from 'react';
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    VStack,
    Flex,
    Text,
    Icon,
    Divider,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Box,
    Select,
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { createProject } from '../../pages/api/projects';

const AddProject = () => {
    const [user] = useAuthState(auth);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [category,setCat] = useState()
    const [title,setTitle] = useState()
    const [estPrice,setEstPrice] = useState()
    const [desc,setDesc] = useState()
    const cancelRef = useRef()
    const [loading,setLoading] = useState()
    const AddButton = async () => {
        const projectDetails = {
            title,estPrice,category,desc,postedUser:user.uid,
        }
        setLoading(true)
        createProject(projectDetails)
        setCat("")
        setDesc("")
        setEstPrice("")
        setTitle("")
        onClose()
        setLoading(false)
    }
    return (

        <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
            <Box display='flex' justifyContent='center'>
                <Button colorScheme='gray' onClick={onOpen}>Add Project</Button>
            </Box>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add Project
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
                                            <FormControl id="name">
                                                <FormLabel>Project Title</FormLabel>
                                                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" rounded="md" />
                                            </FormControl>
                                            <FormControl id="email">
                                                <FormLabel>Estimated Price</FormLabel>
                                                <Input value={estPrice} onChange={(e) => setEstPrice(e.target.value)} type="number" placeholder="" rounded="md" />
                                            </FormControl>
                                        </Stack>
                                        <FormControl id="subject">
                                            <FormLabel>Category</FormLabel>
                                            <Select mb={4}
                                            value={category} 
                                            onChange={(e) => setCat(e.target.value)}
                                            >
                                                <option
                                                    value={""}
                                                    style={{ color: "yellow", fontWeight: "bold" }}
                                                >
                                                    Select
                                                </option>
                                                <option
                                                    value={"Graphics & Design"}
                                                    style={{ color: "yellow", fontWeight: "bold" }}
                                                >
                                                    Graphics & Design
                                                </option>
                                                <option
                                                    value={"Programming & Tech"}
                                                    style={{ color: "green", fontWeight: "bold" }}
                                                >
                                                    Programming & Tech
                                                </option>
                                                <option
                                                    value={"Music & Audio"}
                                                    style={{ color: "green", fontWeight: "bold" }}
                                                >
                                                    Music & Audio
                                                </option>
                                                <option
                                                    value={"Video & Animation"}
                                                    style={{ color: "green", fontWeight: "bold" }}
                                                >
                                                    Video & Animation
                                                </option> <option
                                                    value={"Writhing & Translation"}
                                                    style={{ color: "green", fontWeight: "bold" }}
                                                >
                                                    Writhing & Translation
                                                </option>
                                            </Select>
                                        </FormControl>
                                        <FormControl id="message">
                                            <FormLabel>Description</FormLabel>
                                            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} size="lg" placeholder="" rounded="md" />
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
                                Create
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Container>
    );
};

export default AddProject;
