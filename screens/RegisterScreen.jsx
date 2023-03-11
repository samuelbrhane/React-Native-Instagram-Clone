import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { Loader } from "../components";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = inputData;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        console.log("user: " + JSON.stringify(user));
        await setDoc(doc(db, "users", user?.uid), {
          fullName: name,
          email,
          followers: 0,
          following: 0,
          timestamp: serverTimestamp(),
        });
        console.log("userRegistered: ");
        navigation.navigate("Main");
        // ...
      })
      .catch((error) => {
        setErrorMessage(
          error.message
            .replace("Firebase: Error (", "")
            .replace(")", "")
            .replace("auth/", "")
            .slice(0, 30)
        );
        console.log("error: " + errorMessage);
      });
  };

  const handleGoogle = () => {};

  // set error message to null after 5s
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  console.log("loading", loading);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <AntDesign name="instagram" size={100} color="white" />
      <Text style={styles.title}>Main</Text>

      {/* Register Form */}
      <View style={styles.formContainer}>
        {/* user name */}
        <TextInput
          placeholder="Full Name"
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

        <View style={styles.authContainer}>
          {/* register */}
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.register}>Register</Text>
          </TouchableOpacity>

          {/* Google Login */}
          <TouchableOpacity onPress={handleGoogle}>
            <Text style={styles.google}>Continue With Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Link */}
      <View style={styles.link}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.footerLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
