import React, {createContext, useState} from 'react';
import {Animated} from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [opacity] = useState(new Animated.Value(1));
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState({
    titulo: null,
    msg: null,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        opacity,
        commonModal,
        msg,
        setUser,
        setCommonModal,
        setMsg,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
