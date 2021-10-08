import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import database from "../database/firebase";

const UserListScreen = ({ navigation: { navigate } }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        await onSnapshot(collection(database, "users"), (querySnapshot) => {
          const userList = [];
          querySnapshot.forEach((doc) => {
            userList.push(doc.data());
          });
          setUsers(userList);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserList();
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => navigate("createUserScreen")}
        title="Create User"
      />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              navigate("userDetailsScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: "https://i.kym-cdn.com/photos/images/original/000/192/298/1319765741001.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserListScreen;
