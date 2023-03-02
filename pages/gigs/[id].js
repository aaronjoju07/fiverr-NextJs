import { ChatIcon, InfoIcon, TimeIcon } from '@chakra-ui/icons';
import {
    Box,
    chakra,
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
    VisuallyHidden,
    List,
    ListItem,
    useToast,
    Tooltip,
    Avatar,
    AvatarBadge,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const gig = ({ gigs }) => {
    const toast = useToast();
    const router = useRouter();
    const { id } = router.query;
    const [user] = useAuthState(auth);
    const [snapshot, loading, error] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

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
                            {/* <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Product Details
                </Text> */}

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
            gigs: docSnap.data()
        },
    };
}
