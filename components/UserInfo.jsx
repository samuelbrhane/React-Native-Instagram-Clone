import { Image, Text, View } from "react-native";
import React from "react";

const UserInfo = ({ activeUserData }) => {
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
        {activeUserData?.data?.profilePicture ? (
          <Image
            source={{ uri: activeUserData?.data?.profilePicture }}
            style={{ height: 80, width: 80, borderRadius: 80 }}
          />
        ) : (
          <Image
            source={require("../assets/Avatar.png")}
            style={{ height: 80, width: 80, borderRadius: 80 }}
          />
        )}

        <Text style={{ fontWeight: "semibold" }}>
          {activeUserData?.data?.fullName}
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
            {activeUserData?.data?.followers.length}
          </Text>
          <Text>Followers</Text>
        </View>

        {/* Number of following */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>
            {activeUserData?.data?.following.length}
          </Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
