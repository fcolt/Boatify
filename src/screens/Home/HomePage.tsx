import React, { useState } from "react";
import { Button, Text, Snackbar } from "@react-native-material/core";
import { oauth } from "react-native-force";
import { Alert } from "react-native";

interface LogoutState {
  success: boolean;
  message: String;
}

export default function HomePage() {
  const logout = () => {
    oauth.logout(
      () => {},
      (error) => console.log(error.message)
    );
  };

  return (
    <>
      <Text variant="h3">Welcome to Boatify!</Text>
      <Text variant="h5">An app inspired by the Salesforce LWC Superbadge</Text>
      <Button title="Logout" onPress={logout}></Button>
    </>
  );
}