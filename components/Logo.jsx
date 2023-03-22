import { Box, Image } from "@chakra-ui/react";


export default function Logo(){
    return(
        <>

        <Box alignItems='center'
        justifyItems='center'
       
         >
            <Image  src="/123.svg"
      alt="Picture of the author"
      boxSize={125}
  />
        </Box>
        </>
    )
}