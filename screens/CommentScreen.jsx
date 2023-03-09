import { Image, ScrollView, Text, TextInput, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const CommentScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            gap: 12,
            borderBottomWidth: 0.5,
            borderColor: "gray",
          }}
        >
          <Image
            source={require("../assets/profile.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#F34FDA",
            }}
          />
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Text style={{ fontSize: 14 }}>User Name</Text>
            <Text style={{ color: "gray" }}>2d</Text>
          </View>
        </View>

        {/* Comments */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "white",
            marginBottom: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Image
                source={require("../assets/profile.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#F34FDA",
                }}
              />
              <View style={{ gap: 5 }}>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 14 }}>User Name</Text>
                  <Text style={{ color: "gray" }}>2d</Text>
                </View>
                <Text>Lorem, ipsum dolor.</Text>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>
                    ----------- View all 28 replies
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* comment likes */}
          <View>
            <EvilIcons name="heart" size={28} color="black" />
            <Text>211</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "white",
            marginBottom: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Image
                source={require("../assets/profile.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#F34FDA",
                }}
              />
              <View style={{ gap: 5 }}>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 14 }}>User Name</Text>
                  <Text style={{ color: "gray" }}>2d</Text>
                </View>
                <Text>Lorem, ipsum dolor.</Text>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>
                    ----------- View all 28 replies
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* comment likes */}
          <View>
            <EvilIcons name="heart" size={28} color="black" />
            <Text>211</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "white",
            marginBottom: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Image
                source={require("../assets/profile.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#F34FDA",
                }}
              />
              <View style={{ gap: 5 }}>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 14 }}>User Name</Text>
                  <Text style={{ color: "gray" }}>2d</Text>
                </View>
                <Text>Lorem, ipsum dolor.</Text>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>
                    ----------- View all 28 replies
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* comment likes */}
          <View>
            <EvilIcons name="heart" size={28} color="black" />
            <Text>211</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "white",
            marginBottom: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Image
                source={require("../assets/profile.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#F34FDA",
                }}
              />
              <View style={{ gap: 5 }}>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 14 }}>User Name</Text>
                  <Text style={{ color: "gray" }}>2d</Text>
                </View>
                <Text>Lorem, ipsum dolor.</Text>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ color: "gray" }}>
                    ----------- View all 28 replies
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* comment likes */}
          <View>
            <EvilIcons name="heart" size={28} color="black" />
            <Text>211</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          alignItems: "center",
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Image
          source={require("../assets/profile.jpg")}
          style={{ width: 22, height: 22, borderRadius: 22 }}
        />
        <TextInput style={{ width: "80%" }} placeholder="Add a comment..." />
        <TouchableOpacity>
          <Text style={{ color: "#F34FDA" }}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentScreen;
