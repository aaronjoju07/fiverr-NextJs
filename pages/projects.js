import {
  Box, Tab, TabList, TabPanel, TabPanels, Tabs, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import ApprovedOrders from '../components/ApprovedOrders';
import { auth, db } from '../firebase';


const projects = () => {

  return (
    <Box display='flex'
      justifyContent='center'
    >
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          <Tab>Your Projects</Tab>
          <Tab>Order</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'md'}
              rounded={'lg'} >
              <ApprovedOrders />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'md'}
              rounded={'lg'} >
              <ApprovedOrders />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default projects
