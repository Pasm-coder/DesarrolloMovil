import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any, "Welcome">;

export default function Welcome({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* IMAGEN */}
      <Image
        source={require("../../assets/login.png")} // cambia la ruta
        style={styles.image}
      />

      {/* CONTENEDOR BOTONES */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F2A2E",
  },

  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },

  buttonsContainer: {
    padding: 30,
    gap: 15,
  },

  loginButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  loginText: {
    color: "#0F2A2E",
    fontSize: 16,
    fontWeight: "600",
  },

  registerButton: {
    backgroundColor: "#00E676",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  registerText: {
    color: "#0F2A2E",
    fontSize: 16,
    fontWeight: "bold",
  },
});