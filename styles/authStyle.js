import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F65CD7",
    flex: 1,
    paddingTop: 140,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
  },
  formContainer: {
    width: "100%",
    padding: 20,
  },
  authInput: {
    backgroundColor: "#F8F1E7",
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordVisibility: {
    position: "absolute",
    top: 10,
    right: 8,
    height: 20,
  },
  errorMessage: {
    textAlign: "center",
    borderColor: "red",
    borderRadius: 5,
    paddingVertical: 4,
    borderWidth: 1,
    color: "#FFFFFF",
  },
  register: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#0FC3D0",
    marginVertical: 2,
    color: "white",
  },
  google: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#0FD089",
    marginVertical: 2,
    justifyContent: "center",
    alignContent: "center",
    color: "white",
  },
  authContainer: {
    marginTop: 6,
  },
  footer: {},
  footerText: {
    color: "white",
  },
  footerLink: {
    color: "white",
    textDecorationLine: "underline",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
