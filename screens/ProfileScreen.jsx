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

const ProfileScreen = ({ route: { params }, navigation }) => {
  console.log("params: " + JSON.stringify(params));
  // get user posts
  // useEffect(() => {
  //   if (auth?.currentUser) {
  //     const q = query(
  //       collection(db, "posts"),
  //       where("creator", "==", auth.currentUser.uid),
  //       orderBy("timestamp", "desc")
  //     );
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const posts = [];
  //       querySnapshot.forEach((doc) => {
  //         posts.push({ data: doc.data(), id: doc.id });
  //       });

  //       setUserPosts(posts);
  //     });
  //   }
  // }, []);

  // flat list render item
  const renderItem = ({ item }, index) => {
    return (
      <Text>check</Text>
      // <View
      //   key={index}
      //   style={{
      //     marginBottom: 1,
      //     width: "33%",
      //   }}
      // >
      //   <Image
      //     source={{
      //       uri: item?.data?.imageUrl,
      //     }}
      //     style={{ height: 120, width: "100%" }}
      //   />
      // </View>
    );
  };

  return (
    <Text>check</Text>
    // <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
    //   <View
    //     style={{
    //       backgroundColor: "#F65CD7",
    //       paddingVertical: 8,
    //     }}
    //   >
    //     <Text
    //       style={{
    //         textAlign: "center",
    //         color: "white",
    //         fontWeight: "bold",
    //         fontSize: 20,
    //       }}
    //     >
    //       Profile
    //     </Text>
    //   </View>

    //   <FlatList
    //     style={{ paddingHorizontal: 10, paddingTop: 10, marginBottom: 25 }}
    //     ListHeaderComponent={
    //       <>
    //         <View>
    //           {/*User Information  */}
    //           <UserInfo activeUser={activeUser} />

    //           {/* Profile change */}
    //           <View
    //             style={{
    //               marginTop: 10,
    //               flexDirection: "row",
    //               justifyContent: "space-between",
    //               gap: 10,
    //             }}
    //           >
    //             <TouchableOpacity
    //               onPress={() => navigation.navigate("Edit Profile")}
    //               style={{
    //                 backgroundColor: "#E6E2E5",
    //                 width: "48%",
    //                 borderRadius: 5,
    //                 paddingVertical: 5,
    //               }}
    //             >
    //               <Text style={{ textAlign: "center", fontWeight: "semibold" }}>
    //                 Edit Profile
    //               </Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //               style={{
    //                 backgroundColor: "#E6E2E5",
    //                 width: "48%",
    //                 borderRadius: 5,
    //                 paddingVertical: 5,
    //               }}
    //             >
    //               <Text style={{ textAlign: "center", fontWeight: "semibold" }}>
    //                 Share Profile
    //               </Text>
    //             </TouchableOpacity>
    //           </View>

    //           {/* users */}
    //           {users.length > 0 && (
    //             <>
    //               {/* Discover People */}
    //               <View
    //                 style={{
    //                   marginTop: 12,
    //                   marginBottom: 10,
    //                 }}
    //               >
    //                 <Text style={{ fontWeight: "bold", fontSize: 16 }}>
    //                   Discover people
    //                 </Text>
    //               </View>
    //               <ScrollView
    //                 horizontal={true}
    //                 showsHorizontalScrollIndicator={false}
    //               >
    //                 {users.map((user, index) => {
    //                   return (
    //                     <View style={{ paddingHorizontal: 3 }} key={index}>
    //                       <UsersCard
    //                         user={user}
    //                         removeUser={removeUser}
    //                         followUser={followUser}
    //                       />
    //                     </View>
    //                   );
    //                 })}
    //               </ScrollView>
    //             </>
    //           )}
    //         </View>
    //         {/* user posts */}
    //         <View style={{ marginTop: 10, marginBottom: 5 }}>
    //           <Text style={{ fontWeight: "bold", fontSize: 16 }}>Posts</Text>
    //         </View>
    //       </>
    //     }
    //     data={userPosts}
    //     keyExtractor={(item) => item.id}
    //     columnWrapperStyle={{ justifyContent: "space-between" }}
    //     numColumns={3}
    //     horizontal={false}
    //     renderItem={renderItem}
    //     ListFooterComponent={
    //       userPosts.length === 0 && (
    //         <>
    //           <Text style={{ textAlign: "center", marginTop: 12 }}>
    //             When you post photos
    //           </Text>
    //           <Text style={{ textAlign: "center" }}>
    //             They'll appear on your profile.
    //           </Text>
    //         </>
    //       )
    //     }
    //   />
    // </View>
  );
};

export default ProfileScreen;
