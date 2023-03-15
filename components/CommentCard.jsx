import { Image, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectActiveUser, selectUsers } from "../redux/slice/usersSlice";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const CommentCard = ({ data, id, postId }) => {
  const users = useSelector(selectUsers);
  const activeUser = useSelector(selectActiveUser);
  const [likes, setLikes] = useState([]);

  const [userLiked, setUserLiked] = useState(false);
  const commentCreator = users.find((user) => user.data.id === data.userId);

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", postId, "comment", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [id]);

  // find user id in comment likes
  useEffect(() => {
    setUserLiked(likes.findIndex((like) => like.id === activeUser.id) !== -1);
  }, [likes, activeUser.id]);

  const handleLike = async () => {
    // remove user id if already liked
    if (userLiked) {
      await deleteDoc(
        doc(db, "posts", postId, "comment", id, "likes", activeUser.id)
      );
    } else {
      // add user if to like array
      await setDoc(
        doc(db, "posts", postId, "comment", id, "likes", activeUser.id),
        {
          username: activeUser?.fullName,
        }
      );
    }
  };

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
          </View>
        </View>
      </View>

      {/* comment likes */}
      <View>
        <EvilIcons
          name="heart"
          size={28}
          color={userLiked ? "#F34FDA" : "black"}
          onPress={handleLike}
        />
        <Text style={{ textAlign: "center" }}>{likes.length}</Text>
      </View>
    </View>
  );
};

export default CommentCard;
