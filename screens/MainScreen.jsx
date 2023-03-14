import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import FeedScreen from "./FeedScreen";
import ProfileScreen from "./ProfileScreen";
import EmptyScreen from "./EmptyScreen";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveUser,
  GET_USERS,
  GET_USER_POSTS,
  GET_POSTS,
} from "../redux/slice/usersSlice";
import { Loader } from "../components";

const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const [loading, setLoading] = useState(true);

  // get data
  useEffect(() => {
    setLoading(true);
    // get users
    if (activeUser) {
      onSnapshot(collection(db, "users"), (snapshot) => {
        let users = [];
        snapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        dispatch(GET_USERS(users));
      });

      // get all posts
      onSnapshot(collection(db, "posts"), (snapshot) => {
        let posts = [];
        snapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        dispatch(GET_POSTS(posts));
      });

      // get user posts
      const q = query(
        collection(db, "posts"),
        where("creator", "==", activeUser.id),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ data: doc.data(), id: doc.id });
        });

        dispatch(GET_USER_POSTS(posts));
      });
    }

    setLoading(false);
  }, []);

  if (loading) return <Loader />;

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
