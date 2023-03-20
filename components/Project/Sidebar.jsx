import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

const Sidebar = () => {
    const [navSize, changeNavSize] = useState("large")

  return (
    <Flex
    pos="sticky"
    left="5"
    h="79vh"
    marginTop="2.5vh"
    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
    borderRadius={navSize == "small" ? "15px" : "10px"}
    w={navSize == "small" ? "75px" : "200px"}
    flexDir="column"
    justifyContent="space-between"
>Hello</Flex>
  )
}

export default Sidebar
