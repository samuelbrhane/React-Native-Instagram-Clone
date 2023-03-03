import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Loader } from "../components";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { styles } from "../styles/authStyle";

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
