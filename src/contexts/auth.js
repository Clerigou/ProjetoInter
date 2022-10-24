import React, {createContext, useState} from 'react';
import {Animated} from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [opacity] = useState(new Animated.Value(1));
  return (
    <AuthContext.Provider value={{user, opacity, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
