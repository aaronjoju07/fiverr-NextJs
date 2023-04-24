import { ChatIcon, InfoIcon, TimeIcon } from '@chakra-ui/icons';
import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    useToast,
    Tooltip,
    Avatar,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Checkbox,
    Textarea,
} from '@chakra-ui/react';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useRef, useState } from 'react';
import { addProject } from '../api/project';

const gig = ({ gigs }) => {
    const [sug, setSug] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const toast = useToast();
    const router = useRouter();
    const { id } = router.query; // id is the name of the dynamic parameter in the URL
    const [user] = useAuthState(auth);
    const [snapshot, loading, error] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))
    const [isChecked, setIsChecked] = useState(false);
    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
    }
    const newChat = async () => {
        const input = gigs.emailId;
        if (!chatExists(input)) {
            await addDoc(collection(db, "chats"), { users: [user.email, input] })
        }
        router.push(`/chat`);
    }
    function notf() {
        toast({ title: `${gigs.notification}`, isClosable: true, position: 'top' });
    }
    const handleSubmit = async () => {
        const dataToSubmit = {
            reqUser: user.email,
            gigUser: gigs.emailId,
            projectaReqStatus: false,
            gigPrice: gigs.price,
            promisedTime: gigs.timeDuration,
            category: gigs.category,
            timeFact: isChecked,
            sug
        }
        addProject(dataToSubmit)
        console.log(dataToSubmit)
    }
    const [docData, setData] = useState([])
    const refreshData = () => {
        if (!user) {
          setTodos([]);
          return;
        }
        const q = query(collection(db, "project"), (where("gigUser", "==", gigs.emailId) && where("reqUser", "==", user.email))
         );
        onSnapshot(q, (querySnapchot) => {
          let ar = [];
          querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
          });
          setData(ar);
        });
      };
      console.log(docData)
    useEffect(() => {
        refreshData()
    }, [user]);
    return (
        <Container maxW={'7xl'} onLoad={notf}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 10, md: 0 }}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'product image'}
                        src={
                            gigs.thumbnail
                        }
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {gigs.title} {' '}
                        </Heading>
                        <Box boxShadow={'sm'} backgroundColor={'gray.50'} rounded='lg' display='flex' justifyContent='space-between' width={"26%"} alignItems='center' >
                            <Avatar size='xs' name={gigs.nmae} src={gigs.pic} ></Avatar>
                            <Text>@{gigs.name}</Text><Tooltip label={`e-mail : ${gigs.emailId}`} fontSize='md'>
                                <InfoIcon boxSize={5} />
                            </Tooltip>
                        </Box>

                        <Text
                            color={useColorModeValue('gray.900', 'gray.400')}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            ₹{gigs.price}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                            />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text
                                color={useColorModeValue('gray.500', 'gray.400')}
                                fontSize={'2xl'}
                                fontWeight={'300'}>
                                {gigs.subject}
                            </Text>
                            <Text fontSize={'lg'}>
                                {gigs.description}
                            </Text>
                        </VStack>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={useColorModeValue('yellow.500', 'yellow.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Features
                            </Text>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                <List spacing={2}>
                                    {gigs.benefitTags.map((tag) => (
                                        <ListItem>{tag}</ListItem>
                                    ))}

                                </List>
                            </SimpleGrid>
                        </Box>
                        <Box>
                            <List spacing={2}>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Duration :
                                    </Text>{' '}
                                    {gigs.timeDuration}
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>

                    <Button
                        ref={btnRef} colorScheme='teal' onClick={onOpen}
                        rounded={'xl'}
                        w={'full'}
                        mt={2}
                        size={'lg'}
                        py={'2'}
                        bg={useColorModeValue('gray.900', 'gray.50')}
                        color={useColorModeValue('white', 'gray.900')}
                        textTransform={'uppercase'}
                        _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                        }}>
                        Continue
                    </Button>
                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        <ChatIcon />
                        <Button variant='ghost' onClick={() => newChat()}>Chat</Button>
                    </Stack>
                </Stack>
            </SimpleGrid>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Confirmation</DrawerHeader>

                    {!(docData.length > 0) ? <DrawerBody>
                        <Text as='b'>Are you sure you want to request this gig?</Text>
                        <List>
                            <ListItem><Text as='i'>{gigs.title}</Text></ListItem>
                            <ListItem><Text as='i'>Expected Delivery Time : {gigs.timeDuration}</Text></ListItem>
                            <ListItem><Text as='i'>₹{gigs.price}</Text></ListItem>
                            <Textarea placeholder="enter decriptiom about the here or for further convertion chat is available"
                                value={sug}
                                onChange={(e) => setSug(e.target.value)}></Textarea>
                            <Checkbox size='md' checked={isChecked}
                                onChange={handleCheckboxChange} >Take your time </Checkbox>
                        </List>
                        <Text as='i' >For further convertion chat is available</Text>
                    </DrawerBody> : <DrawerBody><Text>You have already a project running!!!!!!</Text></DrawerBody>}
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        {!(docData.length > 0) ? <Button colorScheme='blue' onClick={() => handleSubmit()}>Confirm</Button> : <Button disabled={true}>Confirm</Button>}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Container>
    );
}

export default gig

export async function getServerSideProps(context) {
    const { id } = context.query; // id is the name of the dynamic parameter in the URL
    const docRef = doc(db, "Gigs", id);
    const docSnap = await getDoc(docRef);
    return {
        props: {
            gigs: (docSnap.data()),
        },
    };
}
