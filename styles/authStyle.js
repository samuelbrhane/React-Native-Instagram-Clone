import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: "#F65175",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 30,
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  authInput: {
    backgroundColor: "#F67691E4",
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordVisibility: {
    position: "absolute",
    right: 5,
    top: "50%",
    transform: [{ translateY: "-50%" }],
  },
  errorMessage: {
    borderRadius: 5,
    paddingVertical: 8,
    fontSize: 14,
    color: "white",
    textAlign: "center",
    backgroundColor: "#AD6A7A38",
  },
  register: {
    fontSize: 20,
    paddingVertical: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "semibold",
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "white",
  },

  footer: {
    flex: 1,
    justifyContent: "end",
    alignItems: "center",
    width: "100%",
  },
  footerText: {
    backgroundColor: "#F67691E4",
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
    color: "white",
    fontWeight: "semibold",
  },
  footerLink: {
    fontWeight: "bold",
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },
});
