import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../redux/slice/usersSlice";

const UserInfo = () => {
  const activeUser = useSelector(selectActiveUser);
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
        {activeUser?.data?.profilePicture ? (
          <Image
            source={{ uri: activeUser?.data?.profilePicture }}
            style={{ height: 80, width: 80, borderRadius: 80 }}
          />
        ) : (
          <Image
            source={require("../assets/Avatar.png")}
            style={{ height: 80, width: 80, borderRadius: 80 }}
          />
        )}

        <Text style={{ fontWeight: "semibold" }}>
          {activeUser?.data?.fullName}
        </Text>
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
          <Text style={{ fontWeight: "bold" }}>
            {activeUser?.data?.followers.length}
          </Text>
          <Text>Followers</Text>
        </View>

        {/* Number of following */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>
            {activeUser?.data?.following.length}
          </Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({});
