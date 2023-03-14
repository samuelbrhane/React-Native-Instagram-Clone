import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveUser,
  ACTIVE_USER,
  LOGOUT_USER,
} from "../redux/slice/usersSlice";
import {
  MainScreen,
  AddPostScreen,
  EditScreen,
  CommentScreen,
  SaveScreen,
  LoginScreen,
  RegisterScreen,
} from ".";
import { Loader } from "../components";
import decode from "jwt-decode";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectActiveUser);
  const [activeUser, setActiveUser] = useState();
  const [loading, setLoading] = useState(true);

  // logout user if token expired
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const userValue = await AsyncStorage.getItem("instagramUser");
      if (userValue) {
        const user = JSON.parse(userValue);
        const token = user.token;
        let decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          await AsyncStorage.removeItem("instagramUser");
          dispatch(LOGOUT_USER);
        }
      }
    };
    checkTokenExpiration();
  }, []);

  // check user state
  useEffect(() => {
    const getUserData = async () => {
      const userValue = await AsyncStorage.getItem("instagramUser");
      if (user) {
        setActiveUser(user);
      } else if (userValue) {
        dispatch(ACTIVE_USER(JSON.parse(userValue)));
        setActiveUser(JSON.parse(userValue));
      } else {
        setActiveUser(null);
      }
      setLoading(false);
    };
    getUserData();
  }, [user]);

  // return loader component while loading
  if (loading || activeUser === undefined) return <Loader />;

  return (
    <NavigationContainer>
      {activeUser ? (
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddPost" component={AddPostScreen} />
          <Stack.Screen
            name="Edit Profile"
            component={EditScreen}
            options={{ headerShadowVisible: false }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentScreen}
            initialParams={{ data: "name" }}
            options={{ headerShadowVisible: false }}
          />
          <Stack.Screen
            name="Save"
            component={SaveScreen}
            options={{ headerShadowVisible: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
