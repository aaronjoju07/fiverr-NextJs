import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Box, Image, Button, Menu, MenuButton, MenuList, MenuItem, Stack, IconButton } from '@chakra-ui/react'
import Auth from './Auth'

export default function Navbar() {
  return (
    <Flex bg="white" py={4} px={6} align="center" justify="space-between">
      <Box align="center" justify="space-between">
        <Image src="fiverr.svg" alt="Logo" boxSize={150} height={10} />
      </Box>
      <Stack size="xl" direction="row" spacing={6} display={{ base: 'none', md: 'flex' }}>
        <Button variant="ghost" mr={4}>Browse</Button>
        <Button variant="ghost" mr={4}>Gig</Button>
        <Button variant="ghost">Project</Button>
        
      </Stack>
      <Box mr={2} display={{ base: 'none', md: 'block' }}>
      <Auth />
      </Box>
      
      <IconButton
        aria-label="Navigation Menu"
        icon={<ChevronDownIcon />}
        size="md"
        variant="ghost"
        display={{ base: 'flex', md: 'none' }}
      />
    </Flex>
  )
}
