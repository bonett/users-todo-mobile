import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, ScrollView } from "react-native";
import { collection, doc, setDoc } from "firebase/firestore";
import database from "../database/firebase";
import { v4 as uuidv4 } from "uuid";

const CreateUserScreen = ({ navigation: { navigate } }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const addNewUser = async () => {
    if (state.name === "") {
      alert("Pease provide a name");
      return;
    }

    try {
      const addNewUser = doc(collection(database, "users"));
      await setDoc(addNewUser, {
        id: uuidv4(),
        name: state.name,
        email: state.email,
        phone: state.phone,
      });

      navigate("userListScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button title="Save User" onPress={() => addNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default CreateUserScreen;
