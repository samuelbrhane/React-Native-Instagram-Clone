import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserInfo, UsersCard } from "../components";
import {
  LOGOUT_USER,
  selectActiveUser,
  selectUsers,
  selectUserPosts,
  REMOVE_USER,
  FOLLOW_USER,
} from "../redux/slice/usersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const users = useSelector(selectUsers);
  const userPosts = useSelector(selectUserPosts);
  const activeUserData = users?.find(
    (user) => user?.data?.id === activeUser?.id
  );

  const unFollowedUsers = users
    ?.filter((user) => user?.data?.id !== activeUser?.id)
    ?.filter((user) => !user.data.followers.includes(activeUser.id));

  console.log("unFollowedUsers", unFollowedUsers);
  // flat list render item
  const renderItem = ({ item }, index) => {
    return (
      <View
        key={index}
        style={{
          marginBottom: 1,
          width: "33%",
        }}
      >
        <Image
          source={{
            uri: item?.data?.imageUrl,
          }}
          style={{ height: 120, width: "100%" }}
        />
      </View>
    );
  };

  // <TouchableOpacity
  //   style={{ marginTop: 100, backgroundColor: "blue" }}
  //   onPress={async () => {
  //     await AsyncStorage.removeItem("instagramUser");
  //     dispatch(LOGOUT_USER());
  //   }}
  // >
  //   <Text>LOGOUT</Text>
  // </TouchableOpacity>

  const removeUser = (id) => {
    dispatch(REMOVE_USER(id));
  };

  const followUser = async (id) => {
    const followedUser = users.find((user) => user?.data?.id === id);
    dispatch(FOLLOW_USER(id));
    dispatch(REMOVE_USER(id));
    await updateDoc(doc(db, "users", id), {
      followers: [...followedUser?.data?.followers, activeUser.id],
    });

    await updateDoc(doc(db, "users", activeUser.id), {
      following: [...activeUserData?.data?.following, id],
    });
  };

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
          Profile
        </Text>
      </View>
      <FlatList
        style={{ paddingHorizontal: 10, paddingTop: 10, marginBottom: 25 }}
        ListHeaderComponent={
          <>
            <View>
              {/*User Information  */}
              <UserInfo activeUserData={activeUserData} />

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
                  onPress={() => navigation.navigate("Edit Profile")}
                  style={{
                    backgroundColor: "#E6E2E5",
                    width: "48%",
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
                    backgroundColor: "#E6E2E5",
                    width: "48%",
                    borderRadius: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ textAlign: "center", fontWeight: "semibold" }}>
                    Share Profile
                  </Text>
                </TouchableOpacity>
              </View>

              {/* users */}

              {unFollowedUsers.length > 0 && (
                <>
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
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {unFollowedUsers?.map((user, index) => {
                      return (
                        <View style={{ paddingHorizontal: 3 }} key={index}>
                          <UsersCard
                            user={user}
                            removeUser={removeUser}
                            followUser={followUser}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                </>
              )}
            </View>
            {/* user posts */}
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Posts</Text>
            </View>
          </>
        }
        data={userPosts}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={3}
        horizontal={false}
        renderItem={renderItem}
        ListFooterComponent={
          userPosts.length === 0 && (
            <>
              <Text style={{ textAlign: "center", marginTop: 12 }}>
                When you post photos
              </Text>
              <Text style={{ textAlign: "center" }}>
                They'll appear on your profile.
              </Text>
            </>
          )
        }
      />
    </View>
  );
};

export default ProfileScreen;
