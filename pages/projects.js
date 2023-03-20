import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, List, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
  Select,
  CircularProgress,
  CircularProgressLabel,
  useToast,
} from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import FeaturedArticles from '../components/OurOrders';
import { auth, db } from '../firebase';
import { updateState, updateStatusTracker } from './api/project';


const projects = () => {
  const toast = useToast();
  const [user] = useAuthState(auth);
  const [prjt, setTodos] = useState([]);
  const [status,setStat] =useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "project"), where("gigUser", "==", user.email));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const updateStatus = async (id, status) => {
    onClose();
     console.log(status)
     console.log(id)
    await updateState({ id, status });
    await updateStatusTracker({id,status})
    toast({
      title: `Status updated`,
      status : 'success'
    });
    
    
  };

  return (
    <>
      <Box display='flex'
        justifyContent='center'  >
        <Tabs w={'70%'}  variant='soft-rounded' colorScheme='green' >
          <TabList justifyContent={'center'}>
            <Tab>Your Projects</Tab>
            <Tab>Order</Tab>
          </TabList>
          <TabPanels>
            <TabPanel >
              <Box bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'md'}
                rounded={'lg'} >
                {prjt && prjt.map((prj) => {
                  {/* statusrun(prj.status) */ }
                  if (prj.projectaReqStatus == true) {
                    return (
                      <Accordion key={prj.pid} defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex='1' textAlign='left' w={'100%'}>
                                {prj.reqUser}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <List>
                              <ListItem>{prj.sug}</ListItem>
                              <ListItem>{prj.category}</ListItem>
                              <ListItem>Gig Price : {prj.gigPrice} </ListItem>
                              <ListItem>Time Flexibility : {!prj.timeFlex ? "Allowed" : "Not Allowed"}</ListItem>
                              <ListItem> Status : {prj.status} {'  '}
                                <CircularProgress size='40px' value={prj.progress} color='green.400'><CircularProgressLabel>{prj.progress}%</CircularProgressLabel></CircularProgress>
                              </ListItem>
                            </List>
                            {prj.status != 'Completed' && <Button onClick={onOpen}>Update Status</Button>}
                            <AlertDialog
                              motionPreset='slideInBottom'
                              leastDestructiveRef={cancelRef}
                              onClose={onClose}
                              isOpen={isOpen}
                              isCentered
                            >
                              <AlertDialogOverlay />

                              <AlertDialogContent>
                                <AlertDialogHeader>Update the Status</AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody>
                                  {prj.status == 'Initial' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase1'>Phase 1</option>
                                  </Select>}
                                  {prj.status == 'Phase1' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase 1 Processing'>Phase 1 Processing</option>
                                  </Select>}
                                  {prj.status == 'Phase 1 Processing' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase 1 Completed'>Phase 1 Completed</option>
                                    <option value='Phase1'>Phase 1 Re-Work</option>
                                  </Select>}
                                  {prj.status == 'Phase 1 Completed' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase2'>Phase 2 </option>
                                  </Select>}
                                  {prj.status == 'Phase2' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase 2 Processing'>Phase 2 Processing</option>
                                  </Select>}
                                  {prj.status == 'Phase 2 Processing' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase 2 Completed'>Phase 2 Completed</option>
                                    <option value='Phase2'>Phase 2 Re-Work</option>
                                  </Select>}
                                  {prj.status == 'Phase 2 Completed' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase3'>Phase 3 </option>
                                  </Select>}
                                  {prj.status == 'Phase3' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase 3 Processing'>Phase 3 Processing</option>
                                  </Select>}
                                  {prj.status == 'Phase 3 Processing' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Phase 3 Completed'>Phase 3 Completed</option>
                                    <option value='Phase3'>Phase 3 Re-Work</option>
                                  </Select>}
                                  {prj.status == 'Phase 3 Completed' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                                    <option value='Completed'>Completed</option>
                                  </Select>}
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                  <Button ref={cancelRef} onClick={onClose}>
                                    No
                                  </Button>
                                  <Button colorScheme='green' ml={3} onClick={()=>updateStatus(prj.id,status )}>
                                    Update
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>)
                  }
                })}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box  >
                <FeaturedArticles />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default projects
