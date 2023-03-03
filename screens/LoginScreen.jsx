import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Loader } from "../components";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = inputData;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Home");

        // ...
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(
          error.message
            .replace("Firebase: Error (", "")
            .replace(")", "")
            .replace("auth/", "")
            .slice(0, 30)
        );
        setLoading(false);
      });
  };

  // set error message to null after 5s
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <AntDesign name="instagram" size={100} color="white" />
      <Text style={styles.title}>Instagram</Text>

      {/* Register Form */}
      <View style={styles.formContainer}>
        {/* email */}
        <TextInput
          placeholder="Email"
          id="email"
          style={styles.authInput}
          value={inputData.email}
          onChangeText={(value) => setInputData({ ...inputData, email: value })}
        />
        {/* password */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            id="password"
            secureTextEntry={!showPassword}
            value={inputData.password}
            onChangeText={(value) =>
              setInputData({ ...inputData, password: value })
            }
            style={styles.authInput}
          />

          {/* control password visibility */}
          <TouchableOpacity
            style={styles.passwordVisibility}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <MaterialIcons name="visibility-off" size={20} color="#47474C" />
            ) : (
              <MaterialIcons name="visibility" size={20} color="#47474C" />
            )}
          </TouchableOpacity>
        </View>

        {/* error message */}
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        {/* Login */}
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.register}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: "#F65175",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 30,
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  authInput: {
    backgroundColor: "#F67691E4",
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordVisibility: {
    position: "absolute",
    right: 5,
    top: "50%",
    transform: [{ translateY: "-50%" }],
  },
  errorMessage: {
    borderRadius: 5,
    paddingVertical: 8,
    fontSize: 14,
    color: "white",
    textAlign: "center",
    backgroundColor: "#AD6A7A38",
  },
  register: {
    fontSize: 20,
    paddingVertical: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "semibold",
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "white",
  },

  footer: {
    flex: 1,
    justifyContent: "end",
    alignItems: "center",
    width: "100%",
  },
  footerText: {
    backgroundColor: "#F67691E4",
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
    color: "white",
    fontWeight: "semibold",
  },
  footerLink: {
    fontWeight: "bold",
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },
});
