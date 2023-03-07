import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const AddPostScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState();
  const [type, setType] = React.useState(CameraType.back);
  const [image, setImage] = React.useState(null);
  const cameraRef = React.useRef(null);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <View />;
  }

  if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log("data", data);
        setImage(data.uri);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.camera} />
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <Text>Hello</Text>
        </Camera>
      )}
      {image ? (
        <View>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => setImage(null)}
          >
            <Text>Retake Pic</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.buttons} onPress={takePicture}>
              <Text>Take Pic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() =>
                setType(type === Camera.back ? Camera.front : Camera.back)
              }
            >
              <Text>Flip</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 5, backgroundColor: "white" }}>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 10,
              }}
              onPress={pickImage}
            >
              <Text style={{ textAlign: "center" }}>
                Take Image From Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    width: "100%",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: 100,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 5,
  },
  buttons: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
