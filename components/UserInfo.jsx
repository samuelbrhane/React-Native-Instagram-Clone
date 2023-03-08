import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const UserInfo = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
      }}
    >
      {/* User profile image and name */}
      <View
        style={{
          justifyContent: "center",
          gap: 5,
          width: "25%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/profile.jpg")}
          style={{ height: 80, width: 80, borderRadius: 80 }}
        />
        <Text style={{ fontWeight: "semibold" }}>User Name</Text>
      </View>

      {/* User Data */}
      <View
        style={{
          gap: 20,
          flexDirection: "row",
          width: "65%",
          justifyContent: "space-between",
        }}
      >
        {/* Number of posts */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>0</Text>
          <Text>Posts</Text>
        </View>

        {/* Number of followers */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>1113</Text>
          <Text>Followers</Text>
        </View>

        {/* Number of following */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>234</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({});
