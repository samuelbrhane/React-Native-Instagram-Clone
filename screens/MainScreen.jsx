import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import FeedScreen from "./FeedScreen";
import ProfileScreen from "./ProfileScreen";
import EmptyScreen from "./EmptyScreen";
import { auth, db } from "../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // get all users
  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(
        getDocs(collection(db, "users")),
        (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push({ data: doc.data(), id: doc.id });
          });

          setUsers(users);
          setLoading(false);
        }
      );
    };
    fetchData();
  }, []);

  if (loading) return;
  console.log("users", users);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      labeled={false}
      activeColor="#232226"
      inactiveColor="#F4EFF1"
      barStyle={{
        backgroundColor: "#F65CD7",
        height: 50,
        justifyContent: "center",
      }}
    >
      {/* Feed Screen */}
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />

      {/* Add Post Screen */}
      <Tab.Screen
        name="AddPostContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddPost");
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="post-add" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />

      {/* Profile Screen */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),

          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
