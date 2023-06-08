import React, { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthContext";
import { TopScrollProvider } from "./TopScrollContext";

export default function ContextProvider({ children }: PropsWithChildren<any>) {
  return (
    <AuthProvider>
      <TopScrollProvider>
        {children}
      </TopScrollProvider>
    </AuthProvider>
  );
}
