import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectUsers } from "../redux/slice/usersSlice";

const CommentCard = ({ data, id }) => {
  const users = useSelector(selectUsers);
  const commentCreator = users.find((user) => user.data.id === data.userId);

  return (
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
            source={
              commentCreator?.data.profilePicture
                ? { uri: commentCreator?.data.profilePicture }
                : require("../assets/Avatar.png")
            }
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
              <Text style={{ fontSize: 14 }}>
                {commentCreator?.data.fullName}
              </Text>
              <Text style={{ color: "gray" }}>2d</Text>
            </View>
            <Text>{data.commentText}</Text>
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
  );
};

export default CommentCard;
