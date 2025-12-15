import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Api from "../../data/api/Api";
import { User } from "../../domain/entities/User";

type Props = NativeStackScreenProps<any, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

const response = await Api.get<User>(
  `/users-mail/${encodeURIComponent(email)}`
);
      if (!response.data) {
        Alert.alert("Error", "Usuario no encontrado");
        return;
      }

      if (response.data.password!== password) {
        Alert.alert("Error", "Contraseña incorrecta");
        return;
      }

      if (response.data.status !== 1) {
        Alert.alert("Error", "Usuario inactivo");
        return;
      }

      navigation.replace("Menu");

    } catch (error: any) {
  console.log("ERROR COMPLETO:", error);
  console.log("STATUS:", error?.response?.status);
  console.log("DATA:", error?.response?.data);

  Alert.alert(
    "Error",
    error?.response?.data?.message || "Error desconocido"
  );
}
  };

  return (
    <View style={styles.container}>
      {/* TÍTULO */}
      <Text style={styles.title}>UNIFUT</Text>
      <Text style={styles.subtitle}>Iniciar Sesión</Text>

      {/* INPUT EMAIL */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* INPUT PASSWORD */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* BOTÓN */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Ingresando..." : "Entrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F2A2E",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#00E676",
    letterSpacing: 3,
  },

  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 40,
  },

  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    backgroundColor: "#00E676",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#0F2A2E",
    fontSize: 18,
    fontWeight: "bold",
  },
});