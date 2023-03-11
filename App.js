import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { Loader } from "./components";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  RegisterScreen,
  LoginScreen,
  MainScreen,
  AddPostScreen,
  SaveScreen,
  CommentScreen,
  EditScreen,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const [activeUser, setActiveUser] = useState();
  const [loading, setLoading] = useState(true);

  // check user state
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        setLoading(false);
      } else {
        setActiveUser(null);
        setLoading(false);
      }
    });
  }, [activeUser]);

  // return loader component while loading
  if (loading || activeUser === undefined) return <Loader />;

  if (activeUser) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="AddPost" component={AddPostScreen} />
              <Stack.Screen name="Save" component={SaveScreen} />
              <Stack.Screen
                name="Edit Profile"
                component={EditScreen}
                options={{ headerShadowVisible: false }}
              />
              <Stack.Screen
                name="Comments"
                component={CommentScreen}
                options={{ headerShadowVisible: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
