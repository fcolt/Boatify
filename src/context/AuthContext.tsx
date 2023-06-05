import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken } from '../util/SFUtil';

export const AuthContext = createContext('');

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw Error('We do not seem to be inside the provider');
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