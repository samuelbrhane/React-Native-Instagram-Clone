import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { UserInfo } from "../components";

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (auth?.currentUser) {
      const q = query(
        collection(db, "posts"),
        where("creator", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ data: doc.data(), id: doc.id });
        });

        setUserPosts(posts);
      });
    }
  }, []);

  console.log("userPosts: " + JSON.stringify(userPosts));

  return (
    <View
      style={{
        marginTop: 30,
        flex: 1,
        paddingVertical: 10,
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
          Profile
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <UserInfo />
      </View>
    </View>
  );
};

export default ProfileScreen;
