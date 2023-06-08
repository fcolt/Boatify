import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken } from '../util/SFUtil';

interface Props {
  accessToken: string,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
}

export const AuthContext = createContext<Props>({} as Props);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw Error('We do not seem to be inside the Auth provider');
  }

  return context;
}

export function AuthProvider({ children }: PropsWithChildren<any>) {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    getAccessToken()
      .then(res => setAccessToken(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}