import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { UserInfo, UserPosts, UsersCard } from "../components";
import { userData } from "../userData";

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);

  // get user posts
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: 20,
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "white",
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
      <View style={{ paddingHorizontal: 10 }}>
        {/*User Information  */}
        <UserInfo />

        {/* Profile change */}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#E2E8E5",
              width: "50%",
              borderRadius: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "semibold" }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#E2E8E5",
              width: "50%",
              borderRadius: 5,
              paddingVertical: 5,
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "semibold" }}>
              Share Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Discover People */}
        <View
          style={{
            marginTop: 12,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Discover people
          </Text>
        </View>

        {/* users */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {userData.map((user, index) => {
            return (
              <View style={{ paddingHorizontal: 3 }} key={index}>
                <UsersCard user={user} />
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* user posts */}
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Posts</Text>
        <UserPosts userPosts={userPosts} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
