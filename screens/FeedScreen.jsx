import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { userData } from "../userData";
import { UsersCard } from "../components";

const FeedScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: 20,
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          backgroundColor: "#F65CD7",
          paddingVertical: 8,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Instagram
        </Text>
      </View>
      {/* User profile and followers */}
      <ScrollView
        style={{ flexDirection: "row", paddingHorizontal: 10 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ marginRight: 6 }}>
          <Image
            source={require("../assets/profile.jpg")}
            style={{ width: 70, height: 70, borderRadius: 70 }}
          />
          <Text style={{ fontSize: 12 }}>User Name</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {userData.map((user, index) => {
            return (
              <View style={{ paddingHorizontal: 10 }} key={index}>
                <Image
                  source={require("../assets/profile.jpg")}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70,
                    borderWidth: 1,
                    borderColor: "#F34FDA",
                  }}
                />
                <Text style={{ fontSize: 12 }}>User Name</Text>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </ScrollView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
