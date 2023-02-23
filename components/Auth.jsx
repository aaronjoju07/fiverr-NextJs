import React from "react";
import { Box, Button, useColorMode, useColorModeValue, useToast,Wrap, WrapItem, Avatar,Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AvatarBadge, } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import { createUserInFirestore } from "../pages/api/user";
const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();
  const toast = useToast();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
       const user = result.user;
        // console.log(user)
        toast({ title: "LogIn successfully", status: "success" });

        // ...
      const ud ={
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        photoUrl:user.photoURL,
      }  
      createUserInFirestore(ud)    
      console.log(ud)
      }
      
      )
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Box >
      {isLoggedIn && (
        <>
        <Menu>
        <MenuButton as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
        <Wrap>
          <WrapItem p={3}>
          <Avatar size='md' name={user.displayName} src={user.photoURL} >
          <AvatarBadge  boxSize='1em' bg='green.500' />
          </Avatar>
          </WrapItem>
        </Wrap>
       
  </MenuButton>
  <MenuList>
  <MenuItem><Link href='/profile' >{user.displayName}</Link></MenuItem>
    <MenuItem  color="red.500" onClick={() => auth.signOut()}>
            Logout
           </MenuItem>
  </MenuList>
        </Menu>
         
        </>
      )}
      {!isLoggedIn && (
        <Box inlineSize={10}>
        <Button display={"center"} ml={19} bg={useColorModeValue('white', 'gray.700')}  leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
          Login with Google
        </Button>
        </Box>
      )}
    </Box>
  );
};

export default Auth;