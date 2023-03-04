import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  RegisterScreen,
  LoginScreen,
  FeedScreen,
  AddPostScreen,
} from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { Loader } from "./components";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check user state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, [user]);

  // return loader component while loading
  if (loading) return <Loader />;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen
              name="Register"
              component={!user ? RegisterScreen : HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={!user ? LoginScreen : HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={user ? HomeScreen : RegisterScreen}
            />
            <Stack.Screen
              name="AddPost"
              component={user ? AddPostScreen : RegisterScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
