import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserListScreen from "./screens/UserListScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="userListScreen"
        component={UserListScreen}
        options={{ title: "Users List" }}
      />
      <Stack.Screen
        name="createUserScreen"
        component={CreateUserScreen}
        options={{ title: "Create a New User" }}
      />
      <Stack.Screen
        name="userDetailsScreen"
        component={UserDetailsScreen}
        options={{ title: "User Detail" }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
