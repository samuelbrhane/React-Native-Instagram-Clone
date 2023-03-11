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
import { PostCard } from "../components";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../redux/slice/usersSlice";
import { selectOtherUsers } from "../redux/slice/usersSlice";

const FeedScreen = ({ navigation }) => {
  const activeUser = useSelector(selectActiveUser);
  const otherUsers = useSelector(selectOtherUsers);
  console.log("active user: " + JSON.stringify(activeUser));
  console.log("other users: " + JSON.stringify(otherUsers));

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
          <View style={{ marginRight: 10 }}>
            {activeUser.data.profilePicture ? (
              <Image
                source={{ uri: user.data.profilePicture }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                }}
              />
            ) : (
              <Image
                source={require("../assets/Avatar.png")}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                }}
              />
            )}

            <Text style={{ fontSize: 10 }}>
              {activeUser?.data.userName || activeUser?.data.fullName}
            </Text>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {otherUsers.map((user, index) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: "center",
                    marginRight: 10,
                    width: 80,
                    height: 100,
                  }}
                  key={index}
                >
                  {user.data.profilePicture ? (
                    <Image
                      source={{ uri: user.data.profilePicture }}
                      style={{
                        width: 72,
                        height: 70,
                        borderRadius: 70,
                        borderWidth: 1,
                        borderColor: "#F34FDA",
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/Avatar.png")}
                      style={{
                        width: 72,
                        height: 70,
                        borderRadius: 70,
                        borderWidth: 1,
                        borderColor: "#F34FDA",
                      }}
                    />
                  )}

                  <Text style={{ fontSize: 10 }}>
                    {user?.data.userName || user?.data.fullName}
                  </Text>
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
