import { Flex, Heading, Avatar, Box } from "@chakra-ui/react"

export default function Topbar({email}) {
  return (
    <Box
      bg="gray.100"
      h="81px" w="100%"
      display="flex"
      flexDirection="row"
      p={5}
    >
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
    </Box>
  )
}