import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Loader } from "../components";
import { styles } from "../styles/authStyle";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { ACTIVE_USER } from "../redux/slice/usersSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    const { email, password } = inputData;
    const { data } = await axios.post("http://10.0.2.2:8000/login", {
      email,
      password,
    });
    if (data.status === false) {
      setErrorMessage(data.error);
    } else {
      const { user, token } = data;
      const value = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        token,
      };
      dispatch(ACTIVE_USER(value));
      const userValue = JSON.stringify(value);
      await AsyncStorage.setItem("instagramUser", userValue);
    }
    setLoading(false);
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
      <Text style={styles.title}>Main</Text>

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

        <View style={styles.authContainer}>
          {/* Login */}
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.register}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Link */}
      <View style={styles.link}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.footerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
