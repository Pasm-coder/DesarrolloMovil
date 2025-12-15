import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export const Menu = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>UNIFUT</Text>
      </View>

      {/* Botones */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Paises")}
      >
        <Text style={styles.buttonText}>Países</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Ciudades")}
      >
        <Text style={styles.buttonText}>Ciudades</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Estadios")}
      >
        <Text style={styles.buttonText}>Estadio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Equipos")}
      >
        <Text style={styles.buttonText}>Equipo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Partidos")}
      >
        <Text style={styles.buttonText}>Partido</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Usuario")}
      >
        <Text style={styles.buttonText}>Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18333A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 120,
    height: 120,
  },

  logoText: {
    color: "#00E676",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 2,
  },

  button: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText: {
    fontSize: 18,
    color: "#1B1B1B",
    fontWeight: "500",
  },
});