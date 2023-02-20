import { Box, Button, Input, InputGroup, InputLeftAddon, Select, Stack, useToast } from '@chakra-ui/react'
import { async } from '@firebase/util';
import React, { useState } from 'react'
import Logo from './Logo';
import useAuth from "../hooks/useAuth";
import { addUser } from '@/pages/api/user';



const UserAdd = () => {
  const { isLoggedIn, user } = useAuth();
  const toast = useToast();
  
  const handleClick = async() =>{
    const addCurrentUser = {
      userId: user.uid,
      userEmail:user.email,
      fname,
      nickname,
      des,
      skill,
      pnom,
      country
    }
    await addUser(addCurrentUser);
     console.log(addCurrentUser);
    //  console.log(user)
     toast({ title: "User created successfully", status: "success" });

  } 
    const [country, setCountry] = React.useState("");
    const [fname,setFname] = React.useState("");
    const [nickname,setNname] = React.useState("");
    const [des,setDes] = React.useState("");
    const [skill,setSkill] = React.useState("");
    const [pnom,setPnom] = React.useState("");

  return (
    
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
    
    <Stack direction="column">
    <Input
          placeholder="Full Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
    <Input
          placeholder="Nick Name"
          value={nickname}
          onChange={(e) => setNname(e.target.value)}
        />   
        <Input
          placeholder="Description"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />   
         <Input
          placeholder="Skills"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        /> 
        <InputGroup>
    <InputLeftAddon children='+91' />
    <Input type='tel' placeholder='phone number'
    value={pnom}
    onChange={(e)=>setPnom(e.target.value)} />
  </InputGroup>
    <Select value={country} onChange={(e) => setCountry(e.target.value)}>
    <option
            value={"India"}
            style={{  fontWeight: "bold" }}
          >
            India
          </option>
          <option
            value={"USA"}
            style={{  fontWeight: "bold" }}
          >
            USA 
          </option>
          <option
            value={"France"}
            style={{  fontWeight: "bold" }}
          >
            France
          </option>
          <option
            value={"UK"}
            style={{  fontWeight: "bold" }}
          >
            UK 
          </option>
          <option
            value={"Germany"}
            style={{  fontWeight: "bold" }}
          >
            Germany
          </option>
          <option
            value={"Sri Lanka"}
            style={{  fontWeight: "bold" }}
          >
            Sri Lankha
          </option>
        </Select>  
        <Button
          onClick={() => handleClick()}
 
          variant="solid"
        >
          Add
        </Button>          
    </Stack>
    </Box>
  )
}

export default UserAdd
