import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const UserPosts = ({ userPosts }) => {
  return (
    <View style={{ marginTop: 8 }}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={3}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginBottom: 1,
                width: "33%",
              }}
            >
              <Image
                source={{
                  uri: item.data.imageUrl,
                }}
                style={{ height: 120, width: "100%" }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
