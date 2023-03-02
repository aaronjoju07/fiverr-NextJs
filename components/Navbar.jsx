import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Box, Image, Button, Stack, IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import Auth from './Auth'
import Notification from './Notification'

export default function Navbar() {
  return (
    <>

      <Flex bg="white" py={4} px={4} align="center" justify="space-between">
        <Box align="center" justify="space-between" p={5} >
          <Link href='/'>
            <Image src="/fiverr.svg" alt="Logo" boxSize={130} height={10} priority="true" />
          </Link>
        </Box>
        <Stack size="xl" direction="row" spacing={6} display={{ base: 'none', md: 'flex' }}>
          <Button variant="ghost" mr={4}>
          <Link href='/chat'>Chat</Link>
          </Button>
          <Button variant="ghost" mr={4}>
            <Link href='/addGig'>Gig</Link>
          </Button>
          <Button variant="ghost">
            <Link href='/projects'>Project</Link>
          </Button>

        </Stack>
        <Box mr={2} display={{ base: 'none', md: 'flex' }} flexDirection='row'> 
<Box p={5}>
          <Notification />
</Box>
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
    </>
  )
}
