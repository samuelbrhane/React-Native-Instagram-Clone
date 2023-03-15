import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectActiveUser, selectUsers } from "../redux/slice/usersSlice";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const PostCard = ({ navigation, id, data }) => {
  const activeUser = useSelector(selectActiveUser);
  const users = useSelector(selectUsers);
  const postCreator = users.find((user) => user.data.id === data.creator);
  const [fullText, setFullText] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userLiked, setUserLiked] = useState(false);

  // Get post likes
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );

    onSnapshot(collection(db, "posts", id, "comment"), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [id]);

  // find user id in post likes
  useEffect(() => {
    setUserLiked(likes.findIndex((like) => like.id === activeUser.id) !== -1);
  }, [likes, activeUser.id]);

  const handleLike = async () => {
    // remove user id if already liked
    if (userLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", activeUser?.id));
    } else {
      // add user if to like array
      await setDoc(doc(db, "posts", id, "likes", activeUser.id), {
        username: activeUser?.fullName,
      });
    }
  };

  const handleComment = async () => {
    await addDoc(collection(db, "posts", id, "comment"), {
      commentText,
      userId: activeUser.id,
    });
    setCommentText("");
  };

  const caption = data?.caption;
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
          {postCreator?.data.profilePicture ? (
            <Image
              source={{ uri: postCreator?.data.profilePicture }}
              style={{ width: 30, height: 30, borderRadius: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/Avatar.png")}
              style={{ width: 30, height: 30, borderRadius: 30 }}
            />
          )}

          <Text>{postCreator?.data?.fullName}</Text>
        </View>
        <Entypo name="dots-three-vertical" size={14} color="black" />
      </View>

      {/* Post */}
      <View>
        <Image
          source={{ uri: data?.imageUrl }}
          style={{ width: "100%", height: 400 }}
        />
      </View>

      {/* Post Details */}
      <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        {/* Like and Comment */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <EvilIcons
            name="heart"
            size={22}
            color={userLiked ? "#F65CD7" : "black"}
            onPress={handleLike}
          />

          <Text style={{ fontWeight: "light" }}>
            {likes.length < 2
              ? likes.length + " like"
              : likes.length + " likes"}
          </Text>
        </View>

        {/* Post Descriptions */}

        <View style={{ marginTop: 3 }}>
          {/* comments */}
          {comments.length > 0 && (
            <TouchableOpacity
              style={{ marginVertical: 1 }}
              onPress={() => navigation.navigate("Comments", { data, id })}
            >
              <Text style={{ color: "gray" }}>
                {comments.length < 2
                  ? "View comment"
                  : `View all ${comments.length} comments`}
              </Text>
            </TouchableOpacity>
          )}

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
            <View
              style={{
                width: "93%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{ width: "92%" }}
                placeholder="Add a comment..."
                value={commentText}
                onChangeText={(value) => setCommentText(value)}
              />
              {commentText.length > 0 && (
                <TouchableOpacity onPress={handleComment}>
                  <Text style={{ color: "#F65CD7" }}>Post</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
