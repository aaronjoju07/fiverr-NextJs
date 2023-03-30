import { chakra, Icon, Avatar, Box, Divider, Heading, HStack, Image, Link, Skeleton, Stack, Text, Tooltip, useColorModeValue, Card, CardBody } from '@chakra-ui/react'
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import LineChart from './Chart/LineChart'

const DisplayGig = ({ gig }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, `Gigs/${gig.id}/CountView`));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  }, [gig]);

  const userData = {
    labels: todos.map((data) => data.date),
    datasets: [
      {
        label: "View Statistics",
        data: todos.map((data) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>

      {gig ?
        (<Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          w={'40%'}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={gig.thumbnail}
            alt='Caffe Latte'
          />

          <Stack>
            <CardBody>
              <Heading size='md'>{gig.title}</Heading>
              <Stack>
                <Text fontSize="md" color="gray.500">Subject : {gig.subject},{gig.description}</Text>
                <Text fontSize="md" color="gray.500">{gig.timeDuration}</Text>
                <Divider />
                <Text fontSize="md" color="gray.500">
                  Benefits
                </Text>
                {gig.benefitTags.map((tags) => (<Text>{tags}</Text>))}
                <Text>₹{gig.price}</Text>
              </Stack>
            </CardBody>
          </Stack>
        </Card>

        ) : (null)}
        <div style={{ width: 600 }}>
        {todos.length > 0 && <LineChart chartData={userData} />}
      </div>
    </>

  )
}

export default DisplayGig
