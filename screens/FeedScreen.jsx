import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import { userData } from "../userData";
import { PostCard, UsersCard } from "../components";

const FeedScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View
        style={{
          backgroundColor: "#F65CD7",
          paddingVertical: 8,
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
          Main
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: "#DBDCDB",
        }}
      >
        {/* User profile and followers */}
        <ScrollView
          style={{
            paddingTop: 5,
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingBottom: 5,
            backgroundColor: "white",
          }}
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

        {/* Posts */}
        <View style={{ borderTopColor: "gray", borderTopWidth: 0.4 }}>
          <PostCard navigation={navigation} />
          <PostCard navigation={navigation} />
          <PostCard navigation={navigation} />
          <PostCard navigation={navigation} />
          <PostCard navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
