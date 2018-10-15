import { StyleSheet } from "react-native";

export default StyleSheet.create({
  applicationView: {
    flex: 1,
    padding: 20
  },
  text: {
    fontSize: 18
  },
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1E88E5"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18
  },
  cardView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20
  },
  navButtonContainer: {
    marginRight: 20,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  statusBarContainer: {
    position: "absolute",
    bottom: -1,
    width: "100%",
    padding: 10,
    backgroundColor: "#1E88E5"
  },
  statusBarText: {
    fontSize: 18,
    color: "#FFFFFF"
  }
});
