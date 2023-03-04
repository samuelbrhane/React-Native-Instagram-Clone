import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddPostScreen, FeedScreen, ProfileScreen } from ".";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={FeedScreen}
      barStyle={{ backgroundColor: "#451DAB" }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          tabBarLabel: "",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="post-add" size={24} color={color} />
          ),
          tabBarLabel: "",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
          tabBarLabel: "",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
