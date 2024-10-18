import { useEffect, useState } from 'react';

const ProtectedRouteHook = () => {
  const userDataFromStorage = localStorage.getItem('user');
  const [userData, setUserData] = useState(
    userDataFromStorage ? JSON.parse(userDataFromStorage) : null
  );
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData != null) {
      if (userData.role === 'user') {
        setIsUser(true);
        setIsAdmin(false);
      } else if (userData.role === 'admin') {
        setIsUser(false);
        setIsAdmin(true);
      }
    } else {
      setIsAdmin(false);
      setIsUser(false);
    }
    setLoading(false);
  }, [userData]);

  return { isUser, isAdmin, userData, setIsUser, setIsAdmin, loading };
};

export default ProtectedRouteHook;
