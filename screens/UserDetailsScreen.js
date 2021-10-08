import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import database from "../database/firebase";

const UserDetailsScreen = ({
  route: {
    params: { userId },
  },
  navigation: { navigate },
}) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    try {
      const querySnapshot = await getDocs(collection(database, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().id === id) {
          setUser(doc.data());
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    setLoading(true);
    await deleteDoc(doc(database, "user", userId));
    setLoading(false);
    navigate("userListScreen");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        ,
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    try {
      setLoading(true);
      const { id, name, email, phone } = user;
      const queryResult = query(
        collection(database, "users"),
        where("id", "==", id)
      );
      const querySnapshot = await getDocs(queryResult);

      querySnapshot.forEach(async (document) => {
        const { id: documentID } = document;
        const userRef = doc(database, "users", documentID);

        await updateDoc(userRef, {
          name,
          email,
          phone,
        });

        setLoading(false);
        navigate("userListScreen");
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById(userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailsScreen;
