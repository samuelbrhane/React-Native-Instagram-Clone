import { Image, Text, View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";

const gender = ["Prefer not to say", "Male", "Female"];

const EditScreen = () => {
  return (
    <View style={{ flex: 1, paddingVertical: 10, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 10 }}>
        <View
          style={{
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/profile.jpg")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 80,
              marginBottom: 5,
            }}
          />
          <TouchableOpacity style={{ marginBottom: 20 }}>
            <Text>Edit Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Full name */}
        <View style={{ marginBottom: 8 }}>
          <Text>Full Name</Text>
          <TextInput
            placeholder="Full Name"
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
          defaultButtonText="Gender"
          buttonStyle={{ backgroundColor: "#F65CD7", borderRadius: 5 }}
          dropdownStyle={{ marginTop: -20, borderRadius: 5 }}
          buttonTextStyle={{ color: "white" }}
          data={gender}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
