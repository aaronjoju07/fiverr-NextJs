import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

const projects = () => {
  return (
    <Box display='flex'
            justifyContent='center'
    >
        <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>Your Projects</Tab>
    <Tab>Requests</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
  )
}

export default projects
