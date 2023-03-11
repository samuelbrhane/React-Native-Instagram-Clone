import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import FeedScreen from "./FeedScreen";
import ProfileScreen from "./ProfileScreen";
import EmptyScreen from "./EmptyScreen";
import { auth, db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { GET_USERS } from "../redux/slice/usersSlice";
const Tab = createMaterialBottomTabNavigator();
import { selectActiveUser, selectOtherUsers } from "../redux/slice/usersSlice";

const MainScreen = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const otherUsers = useSelector(selectOtherUsers);
  // get all
  useEffect(() => {
    const fetchData = async () => {
      const user = auth?.currentUser;
      if (user) {
        let users = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        dispatch(GET_USERS(users));
      }
    };
    fetchData();
  }, []);

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
