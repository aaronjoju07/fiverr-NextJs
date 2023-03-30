import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Container,
  CircularProgress,
  CircularProgressLabel,
  Button,
  color
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { MotionBox } from './motion';
import { CommentIcon, HeartIcon } from './icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { CheckCircleIcon, NotAllowedIcon, TimeIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const BASE_URL = 'https://mahmad.me';

const posts = [
  {
    title: 'Started 2022 by updating portfolio website',
    description: `I was thinking about making some changes in my portfolio website since past few months. I couldn't...`,
    slug: '/blog/started-2022-by-updating-portfolio-website-1jde-temp-slug-4553258',
    positive_reactions_count: '189',
    comments_count: '26',
    published_at: '21st January 2021'
  }
];
const createCheckoutSession = async (category,gigPrice,id,pid) => {
  const cartItem = {category,gigPrice,id,pid}
  fetch('api/checkout_sessions', { method: 'POST',body: cartItem })
      .then(res => {
          console.log(res)
          // window.location = res.data.sessionURL
      })
      .catch(err => console.log(err))
}

const FeaturedArticles = () => {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState([]);
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "project"), where("reqUser", "==", user.email));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data()});
      });
      setTodos(ar);
    });
  };
  console.log(todos)
  useEffect(() => {
    refreshData();
  }, [user]);
  const linkColor = 'blue.400';
  const textColor = useColorModeValue('gray.500', 'gray.200');
  const router = useRouter();
  function cliclChat(){
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
  return (
    <Container maxW="4xl" p={{ base: 5, md: 1 }}>
      <VStack align="start" spacing={8} width="100%">
        <SimpleGrid columns={1} spacing={4} w="100%">
          {todos &&
            todos.map(
              (
                {id,
                  category,
                  gigUser,
                  gigPrice,
                  payment,
                  pid,
                  progress,
                  projectaReqStatus,
                  promisedTime,
                  reqTime,
                  reqUser,
                  status,
                  sug,
                  timeFlex,
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
                      <Heading fontSize="lg" align="left" mt={0}>
                        <Text as={Link} color={linkColor}>
                          {category} -- {gigUser}
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
                       {payment ? <CheckCircleIcon color={'green.400'} /> :<NotAllowedIcon color={'red.400'} />},
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
                        <Button variant='unstyled' onClick={()=>cliclChat()} ><CommentIcon /></Button>
                      </Flex>
                    </HStack>
                    <Text align="left" fontSize="md" noOfLines={1} color={textColor}>
                    LastUpdate : <TimeIcon color={'blue.500'} /> {update.toDate().toLocaleDateString()}-{update.toDate().toLocaleTimeString()}
                    </Text>
                    {(status == 'Completed' && !payment) &&<Text as={'i'}>
                    <form action="/api/checkout_sessions" method="POST">

                      <Button type="submit" role="link" size='sm' variant={'ghost'}>
                       Pay :{gigPrice}
                      </Button>
                      </form>
                    </Text>}
                  </VStack>
                </MotionBox>
              )
            )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default FeaturedArticles;