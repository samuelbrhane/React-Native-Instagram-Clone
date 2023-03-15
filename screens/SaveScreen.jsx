import { Image, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../redux/slice/usersSlice";
import { CLOUDINARY_URL } from "@env";
import { CLOUDINARY_USERNAME } from "@env";

const SaveScreen = (props) => {
  const activeUser = useSelector(selectActiveUser);

  const image = props.route.params.image;

  const [caption, setCaptions] = useState("");

  const handleSave = async () => {
    const imageData = { uri: image, type: "test/png", name: "test.png" };
    const data = new FormData();
    data.append("file", imageData);
    data.append("upload_preset", "images");
    data.append("cloud_name", CLOUDINARY_USERNAME);
    const uploadResponse = await fetch(CLOUDINARY_URL, {
      method: "post",
      body: data,
    });

    const jsonResponse = await uploadResponse.json();

    const storeData = {
      caption,
      imageUrl: jsonResponse.url,
      fullName: activeUser.fullName,
      timestamp: serverTimestamp(),
      creator: activeUser?.id,
    };

    await addDoc(collection(db, "posts"), storeData);
    props.navigation.navigate("Main");
  };

  return (
    <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 5 }}>
      <Image
        style={{ backgroundColor: "#F65CD7", width: "100%", height: "85%" }}
        source={{
          uri: image,
        }}
      />

      <TextInput
        style={{
          marginTop: 10,
          borderRadius: 5,
          backgroundColor: "#E7DCDC",
          paddingHorizontal: 12,
          paddingVertical: 5,
          shadowRadius: 5,
        }}
        placeholder="Write a Caption"
        value={caption}
        onChangeText={(value) => setCaptions(value)}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "#F65CD7",
          marginTop: 10,
          paddingVertical: 8,
          borderRadius: 5,
        }}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SaveScreen;
