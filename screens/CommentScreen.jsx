import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommentCard, Loader } from "../components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { selectUsers } from "../redux/slice/usersSlice";
import Moment from "react-moment";

const CommentScreen = ({ route: { params } }) => {
  const { data, id } = params;
  const users = useSelector(selectUsers);
  const postCreator = users.find((user) => user.data.id === data.creator);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  // fetch post comments
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "comment"), (snapshot) => {
      let comments = [];
      snapshot.forEach((doc) => {
        comments.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setComments(comments);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

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
            source={
              postCreator.data.profilePicture
                ? { uri: postCreator.data.profilePicture }
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
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Text style={{ fontSize: 14 }}>{postCreator?.data?.fullName}</Text>
            <Text style={{ color: "gray" }}>
              2d
              {/* <Moment fromNow>
                <Text>{data?.timestamp?.toDate()}</Text>
              </Moment> */}
            </Text>
          </View>
        </View>

        {/* Comments */}
        {comments.map((comment) => {
          const { data, id } = comment;
          return <CommentCard key={id} data={data} id={id} />;
        })}
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
