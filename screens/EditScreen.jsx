import { Image, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectActiveUser, selectUsers } from "../redux/slice/usersSlice";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Loader } from "../components";

const genderList = ["Prefer not to say", "Male", "Female"];

const EditScreen = ({ navigation }) => {
  const activeUser = useSelector(selectActiveUser);
  const users = useSelector(selectUsers);
  const activeUserData = users?.find(
    (user) => user?.data?.id === activeUser?.id
  );
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(activeUserData?.data?.fullName);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(activeUserData?.data?.userName);
  const [pronouns, setPronouns] = useState(activeUserData?.data?.pronouns);
  const [bio, setBio] = useState(activeUserData?.data?.bio);
  const [gender, setGender] = useState(activeUserData?.data?.gender);

  // handle save edit
  const handleEdit = async () => {
    setLoading(true);
    const storeData = {
      fullName: fullName === undefined ? "" : fullName,
      userName: userName === undefined ? "" : userName,
      bio: bio === undefined ? "" : bio,
      pronouns: pronouns === undefined ? "" : pronouns,
      gender: gender === undefined ? "" : gender,
    };

    // upload image in cloundinary
    if (image) {
      const imageData = { uri: image, type: "test/png", name: "test.png" };
      const data = new FormData();
      data.append("file", imageData);
      data.append("upload_preset", "images");
      data.append("cloud_name", "dat2kqoex");
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dat2kqoex/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const jsonResponse = await uploadResponse.json();
      storeData.profilePicture = jsonResponse.url;
      await updateDoc(doc(db, "users", activeUser?.id), storeData);
    } else {
      await updateDoc(doc(db, "users", activeUser?.id), storeData);
    }

    navigation.navigate("Main");
    setLoading(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (loading) return <Loader />;

  return (
    <View style={{ flex: 1, paddingVertical: 10, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 10 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <View style={{ position: "absolute", top: 0, right: 10 }}>
            <AntDesign
              name="save"
              size={25}
              color="#F65CD7"
              onPress={handleEdit}
            />
          </View>

          <Image
            source={
              activeUserData?.data?.profilePicture
                ? { uri: activeUserData?.data?.profilePicture }
                : require("../assets/Avatar.png")
            }
            style={{
              height: 80,
              width: 80,
              borderRadius: 80,
              marginBottom: 5,
            }}
          />
          <TouchableOpacity style={{ marginBottom: 20 }} onPress={pickImage}>
            <Text>Edit Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Full name */}
        <View style={{ marginBottom: 8 }}>
          <Text>Full Name</Text>
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={(value) => setFullName(value)}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: "gray",
              shadowOffset: { width: 0.3, height: 1 },
              marginTop: 3,
              marginBottom: 8,
              paddingVertical: 3,
            }}
          />
        </View>

        {/* User name */}
        <View style={{ marginBottom: 8 }}>
          <Text>User Name</Text>
          <TextInput
            placeholder="User Name"
            value={userName}
            onChangeText={(value) => setUserName(value)}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: "gray",
              shadowOffset: { width: 0.3, height: 1 },
              marginTop: 3,
              marginBottom: 8,
              paddingVertical: 3,
            }}
          />
        </View>

        {/* Pronouns */}
        <View style={{ marginBottom: 8 }}>
          <Text>Pronouns</Text>
          <TextInput
            placeholder="Pronouns"
            value={pronouns}
            onChangeText={(value) => setPronouns(value)}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: "gray",
              shadowOffset: { width: 0.3, height: 1 },
              marginTop: 3,
              marginBottom: 8,
              paddingVertical: 3,
            }}
          />
        </View>

        {/* Bio */}
        <View style={{ marginBottom: 8 }}>
          <Text>Bio</Text>
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={(value) => setBio(value)}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: "gray",
              shadowOffset: { width: 0.3, height: 1 },
              marginTop: 3,
              marginBottom: 8,
              paddingVertical: 3,
            }}
          />
        </View>

        {/* Gender */}
        <SelectDropdown
          defaultButtonText={gender}
          buttonStyle={{ backgroundColor: "#F65CD7", borderRadius: 5 }}
          dropdownStyle={{ marginTop: -20, borderRadius: 5 }}
          buttonTextStyle={{ color: "white" }}
          data={genderList}
          onSelect={(selectedItem, index) => {
            setGender(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>

      {/* static text */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            borderBottomWidth: 0.4,
            borderColor: "gray",
            padding: 10,
          }}
        >
          Page
        </Text>
        <Text
          style={{
            borderBottomWidth: 0.4,
            borderColor: "gray",
            padding: 10,
            color: "#F65CD7",
          }}
        >
          Switch to professional account
        </Text>
        <Text
          style={{
            borderBottomWidth: 0.4,
            borderColor: "gray",
            padding: 10,
            color: "#F65CD7",
          }}
        >
          Personal information settings
        </Text>
      </View>
    </View>
  );
};

export default EditScreen;
