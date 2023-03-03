import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Touchable } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <AntDesign name="instagram" size={100} color="white" />
      <Text style={styles.title}>Instagram</Text>

      {/* Register Form */}
      <View style={styles.formContainer}>
        {/* user name */}
        <TextInput
          placeholder="User Name"
          id="name"
          style={styles.authInput}
          value={inputData.name}
          onChangeText={(value) => setInputData({ ...inputData, name: value })}
        />

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

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
    marginVertical: 20,
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
