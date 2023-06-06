import React, { useEffect, useState } from "react";
import { Appbar, Avatar, Menu } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { net, oauth } from "react-native-force";
import { User } from "../models/user";
import { QueryResult } from "../models/queryResult";
import { useAuthContext } from "../context/AuthContext";
import SampleImage from '../../assets/Sample_User_Icon.png';
import { Image } from 'react-native';

const AppBar = ({ route, options, navigation }: BottomTabHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const [visible, setVisible] = useState(false);
  const { accessToken } = useAuthContext();
  const [profilePic, setProfilePic] = useState<string>(Image.resolveAssetSource(SampleImage).uri);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    oauth.getAuthCredentials(
      (res) => {
        net.query(
          `SELECT SmallPhotoUrl FROM User WHERE Id = \'${res.userId}\'`,
          (res: QueryResult<User>) => setProfilePic(res.records[0].SmallPhotoUrl),
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
              () => {}
            )
          }
          title="Logout"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default AppBar;
