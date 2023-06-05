import React, { useEffect, useState } from "react";
import { Appbar, Avatar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { net, oauth } from "react-native-force";
import { User } from "../models/user";
import { ORGANIZATION_URL } from "../api/constants";

interface UserQueryResult {
  records: User[];
}

const AppBar = ({ route, options, navigation }: BottomTabHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const [accessToken, setAccessToken] = useState("");
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    oauth.getAuthCredentials(
      (res) => {
        setAccessToken(res.accessToken);
        net.query(
          `SELECT SmallPhotoUrl FROM User WHERE Id = \'${res.userId}\'`,
          (res: UserQueryResult) => setProfilePic(res.records[0].SmallPhotoUrl),
          (err) => console.log(err.message)
        );
      },
      (err) => console.log(err.message)
    );
  }, []);

  return (
    <Appbar.Header>
      {route.name !== "Home" ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : null}
      <Appbar.Content title={title} />
      <Appbar.Action
        icon={() => (
          <Avatar.Image
            size={30}
            source={{
              uri: profilePic,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
          />
        )}
        onPress={() => {}}
      />
    </Appbar.Header>
  );
};

export default AppBar;
