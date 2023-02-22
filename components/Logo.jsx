import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function Logo(){
    return(
        <Box alignItems='center'
        justifyItems='center'
        p={5}
         >
            <Image  src="logoStudLance.jpeg"
      alt="Picture of the author"
      width={150}
      height={100} 
      priority />
        </Box>
    )
}