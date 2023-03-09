import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, EvilIcons } from "@expo/vector-icons";

const PostCard = () => {
  const [fullText, setFullText] = useState(false);
  console.log("full text", fullText);

  const caption = `Lorem ipsum dolor sit amet consectetur `;
  return (
    <View
      style={{
        backgroundColor: "white",
        marginBottom: 12,
        shadowColor: "red",
        shadowOpacity: 1,
        shadowRadius: 7,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      }}
    >
      {/* Top Desc */}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={require("../assets/profile.jpg")}
            style={{ width: 30, height: 30, borderRadius: 30 }}
          />
          <Text>User Name</Text>
        </View>
        <Entypo name="dots-three-vertical" size={14} color="black" />
      </View>

      {/* Post */}
      <View>
        <Image
          source={require("../assets/profile.jpg")}
          style={{ width: "100%" }}
        />
      </View>

      {/* Post Details */}
      <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        {/* Like and Comment */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <EvilIcons name="heart" size={28} color="black" />
          <EvilIcons name="comment" size={28} color="black" />
        </View>

        {/* Post Descriptions */}
        <View style={{ marginTop: 3 }}>
          <Text style={{ fontWeight: "bold" }}>20,123,123 likes</Text>

          <View
            style={{
              marginTop: 3,
              flexDirection: "row",
              gap: 2,
              alignContent: "center",
              marginBottom: 2,
            }}
          >
            <Image
              source={require("../assets/profile.jpg")}
              style={{ width: 18, height: 18, borderRadius: 12 }}
            />
            <Text>
              Liked by <Text style={{ fontWeight: "bold" }}>User Name</Text> and
              19,234,124 others
            </Text>
          </View>

          {/* comments */}
          <TouchableOpacity style={{ marginVertical: 1 }}>
            <Text style={{ color: "gray" }}>View all 86 comments</Text>
          </TouchableOpacity>

          {/* Caption */}
          {caption.length > 90 ? (
            <TouchableOpacity>
              {!fullText ? (
                <Text style={{ fontSize: 13 }}>
                  {caption.slice(0, 90)}...
                  <Text
                    style={{ color: "gray" }}
                    onPress={() => setFullText(true)}
                  >
                    more
                  </Text>
                </Text>
              ) : (
                <Text style={{ fontSize: 13 }}>
                  {caption}{" "}
                  <Text
                    style={{ color: "gray" }}
                    onPress={() => setFullText(false)}
                  >
                    less
                  </Text>
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <Text>{caption}</Text>
          )}

          <View
            style={{
              marginVertical: 3,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Image
              source={require("../assets/profile.jpg")}
              style={{ width: 22, height: 22, borderRadius: 22 }}
            />
            <TextInput
              style={{ width: "93%" }}
              placeholder="Add a comment..."
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
