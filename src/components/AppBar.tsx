import React, { useEffect, useState } from "react";
import { Appbar, Avatar, Menu } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { oauth } from "react-native-force";
import { useAuthContext } from "../context/AuthContext";
import SampleImage from '../../assets/Sample_User_Icon.png';
import { Image } from 'react-native';
import agent, { handleError } from "../api/agent";

const PLACEHOLDER_AVATAR = Image.resolveAssetSource(SampleImage).uri

const AppBar = ({ route, options, navigation }: BottomTabHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const [visible, setVisible] = useState(false);
  const { accessToken } = useAuthContext();
  const [profilePic, setProfilePic] = useState(PLACEHOLDER_AVATAR);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    oauth.getAuthCredentials(
      (res) => {
        agent.UserAccount.getProfilePic(
          res.userId,
          (res) => setProfilePic(res.records[0].SmallPhotoUrl) 
        )
      },
      (err) => console.log('Failed to get authentication credentials: ' + err)
    );
  }, []);

  return (
    <Appbar.Header>
      {route.name !== "Home" ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : null}
      <Appbar.Content title={title} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            onPress={openMenu}
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
          />
        }
      >
        <Menu.Item
          onPress={() =>
            oauth.logout(
              () => {},
              (error) => {() => handleError(error)}
            )
          }
          title="Logout"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default AppBar;
