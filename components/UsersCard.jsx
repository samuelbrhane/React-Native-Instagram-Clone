import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const UsersCard = ({ user }) => {
  const { name, image } = user;

  return (
    <View
      style={{
        width: 170,
        borderWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
        position: "relative",
      }}
    >
      <TouchableOpacity style={{ position: "absolute", top: 5, right: 10 }}>
        <FontAwesome5 name="times" size={16} color="#234323" />
      </TouchableOpacity>

      <Image
        source={require("../assets/profile.jpg")}
        style={{ height: 100, width: 100, borderRadius: 100, marginBottom: 5 }}
      />
      <Text style={{ marginBottom: 20 }}>{name}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#F65CD7",
          paddingHorizontal: 24,
          paddingVertical: 4,
          borderRadius: 3,
        }}
      >
        <Text style={{ color: "white" }}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsersCard;

const styles = StyleSheet.create({});
