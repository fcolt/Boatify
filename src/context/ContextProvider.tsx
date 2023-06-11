import React, { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthContext";
import { TopScrollProvider } from "./TopScrollContext";
import { ReviewDialogProvider } from "./ReviewDialogContext";

export default function ContextProvider({ children }: PropsWithChildren<any>) {
  return (
    <AuthProvider>
      <TopScrollProvider>
        <ReviewDialogProvider>{children}</ReviewDialogProvider>
      </TopScrollProvider>
    </AuthProvider>
  );
}
