import { cookieStorageManager } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; 
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading,steLoading] = useState(true)


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
      steLoading(false)
    });
  });
  return { loading, user, isLoggedIn };
};

export default useAuth;