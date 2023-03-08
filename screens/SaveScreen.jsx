import { Image, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SaveScreen = (props) => {
  const image = props.route.params.image;
  const [caption, setCaptions] = useState("");

  console.log("captions: " + caption);

  const handleSave = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    // Upload images to firebase storage
    const storeImage = async (imageBlob) => {
      return new Promise((resolve, reject) => {
        const filename = `${auth?.currentUser?.uid}-${Math.random().toString(
          36
        )}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, imageBlob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    await storeImage(blob).then(async (imageUrl) => {
      const storeData = {
        caption,
        imageUrl,
        timestamp: serverTimestamp(),
        creator: auth?.currentUser?.uid,
      };
      await addDoc(collection(db, "posts"), storeData);
      props.navigation.navigate("Main");
    });
  };

  return (
    <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 5 }}>
      <Image
        style={{ backgroundColor: "red", width: "100%", height: "85%" }}
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
          backgroundColor: "#FA879E",
          marginTop: 10,
          paddingVertical: 8,
          borderRadius: 5,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SaveScreen;
