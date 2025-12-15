import { StyleSheet } from "react-native";

export const MyColors = {
  primary: "#1E88E5",
  secondary: "#1565C0",
  background: "#F5F5F5",
  text: "#212121",
  white: "#FFFFFF",
  gray: "#9E9E9E",
};

export const AppTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.background,
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: MyColors.primary,
    marginBottom: 12,
  },

  item: {
    padding: 14,
    backgroundColor: MyColors.white,
    borderRadius: 8,
    marginBottom: 10,
  },

  itemText: {
    fontSize: 16,
    color: MyColors.text,
  },
});
