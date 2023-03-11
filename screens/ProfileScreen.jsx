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
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { UserInfo, UsersCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { selectOtherUsers, selectActiveUser } from "../redux/slice/usersSlice";
import { HANDLE_FOLLOW } from "../redux/slice/usersSlice";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  let otherUsers = useSelector(selectOtherUsers).filter(
    (user) => !user?.data.following.includes(activeUser.id)
  );
  const [users, setUsers] = useState(otherUsers);
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

  // remove user from discover people list
  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // follow user
  const followUser = async (id) => {
    dispatch(HANDLE_FOLLOW(id));
    setUsers(users.filter((user) => user.id !== id));
  };

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
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {users.map((user, index) => {
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
      />
    </View>
  );
};

export default ProfileScreen;
