import { StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/instagram.gif")}
        style={styles.loader}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#fff",
  },
  loader: {
    width: "100%",
    height: 300,
  },
});
