import React, { useEffect, useRef, useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text, Skeleton,
  Link,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Container,Box,
  CircularProgress,
  CircularProgressLabel,
  Button, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { MotionBox } from './motion';
import { CommentIcon } from './icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { CheckCircleIcon, NotAllowedIcon, TimeIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const handleCheckout = async (gigPrice, id) => {
  try {
    const lineItems = { gigPrice, id }
    const { session } = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    }).then(res => res.json())

    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id })

    if (error) {
      if (error instanceof Error) throw new Error(error.message)
    } else {
      throw error
    }
  } catch (error) {
    console.log(error)
  }
};



const FeaturedArticles = () => {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState([]);
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "project"), where("reqUser", "==", user.email) | where("BidUser", "==", user.email));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };
  // console.log(todos)
  useEffect(() => {
    refreshData();
  }, [user]);
  const linkColor = 'blue.400';
  const textColor = useColorModeValue('gray.500', 'gray.200');
  const router = useRouter();
  function cliclChat() {
    router.push(`/chat`);
  }
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, [])
  const [tod, setTod] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  function handleAction(id) {
    if (!user) {
      setTod([]);
      setLoading(true)
      return;
    }
    setLoading(true)
    const q = query(collection(db, `project/${id}/status`),orderBy("reqTime", "asc"));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTod(ar);
      onOpen()
    });
    
    setLoading(false)

  }
  const [loading, setLoading] = useState(true)
  return (
    <Container maxW="4xl" p={{ base: 5, md: 1 }}>
      <VStack align="start" spacing={8} width="100%">
        <SimpleGrid columns={1} spacing={4} w="100%">
          {todos &&
            todos.map(
              (
                { id, User,
                  category,
                  gigUser,
                  gigPrice,
                  payment,
                  progress,
                  status,
                  update
                },
                i
              ) => (
                <MotionBox whileHover={{ y: -5 }} key={i}>
                  <VStack
                    spacing={1}
                    p={4}
                    _hover={{ shadow: 'md', textDecoration: 'none' }}
                    borderWidth="1px"
                    position="relative"
                    rounded="md"
                    bg={useColorModeValue('white', 'gray.800')}
                    align="left"
                  >
                    <HStack justifyContent="space-between" isInline>
                      <Heading fontSize="lg" align="left" mt={0} onClick={() => handleAction(id)}>
                        <Text as={Link} color={linkColor}>
                          {category} -- {gigUser || User} -- {gigUser ? ("Gig") : ("Project")}
                        </Text>
                      </Heading>
                      <HStack spacing={2} isInline d={['none', 'flex', 'flex']}>

                      </HStack>
                    </HStack>
                    <HStack spacing={2} isInline>
                      <Text fontSize="sm" fontWeight="600" color={textColor}>
                        Status : {status}
                      </Text>
                      <CircularProgress size='40px' value={progress} color='green.200'><CircularProgressLabel>{progress}%</CircularProgressLabel></CircularProgress>

                      <Flex alignItems="center" d={['flex', 'none', 'none']}>
                        <Text
                          fontSize="sm"
                          noOfLines={1}
                          fontWeight="400"
                          align="left"
                          color={textColor}
                        >
                          Payment : {payment ? 'Done' : 'Pending'}
                        </Text>
                        &nbsp;
                        {payment ? <CheckCircleIcon color={'green.400'} /> : <NotAllowedIcon color={'red.400'} />},
                      </Flex>

                      <Flex alignItems="center" d={['flex', 'none', 'none']}>
                        <Text
                          fontSize="sm"
                          noOfLines={1}
                          fontWeight="400"
                          align="left"
                          color={textColor}
                        >
                          {category}
                        </Text>
                        &nbsp;
                        <Button variant='unstyled' onClick={() => cliclChat()} ><CommentIcon /></Button>
                      </Flex>
                    </HStack>
                    {update && (<Text align="left" fontSize="md" noOfLines={1} color={textColor}>
                      LastUpdate : <TimeIcon color={'blue.500'} /> {update.toDate().toLocaleDateString()}-{update.toDate().toLocaleTimeString()}
                    </Text>)}
                    {(status == 'Completed' && !payment) && <Text as={'i'}>
                      <Button onClick={(e) => handleCheckout(gigPrice, id)}>Pay {gigPrice}</Button>
                    </Text>}
                  </VStack>
                </MotionBox>
              )
            )}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Histroy
                </AlertDialogHeader>

                <AlertDialogBody maxH="500px" overflowY="scroll">
                  {!loading ? (
                    tod.map((tods) => (
                      <Box key={tods.id}>
                        <Flex align="center">
                          <Box bg="gray.500" w="2" h="2" rounded="full" mr={4} />
                          <Text fontWeight="medium">{tods.reqTime.toDate().toLocaleDateString()}
                          </Text>
                        </Flex>
                        <Text ml="6" mb="4">{tods.status}</Text>
                      </Box>
                    ))
                  ) : (
                    <div>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </div>
                  )}
                </AlertDialogBody>
                <AlertDialogFooter justify-content={'center'}>
                  <Button ref={cancelRef} onClick={onClose}>
                    Close
                  </Button>

                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default FeaturedArticles;