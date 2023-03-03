import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { Loader } from "../components";
import { styles } from "../styles/authStyle";

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Register User
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = inputData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        const user = userCredential.user;
        setLoading(false);
        navigation.navigate("Home");
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

        {/* error message */}
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        {/* register */}
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
