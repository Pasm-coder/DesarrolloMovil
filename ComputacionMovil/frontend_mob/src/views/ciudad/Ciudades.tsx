import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useCiudades } from "../../hooks/useCiudades";

export const Ciudades = ({ route, navigation }: any) => {
  const { paisId } = route.params;
  const { ciudades, loading } = useCiudades(paisId);

  if (loading) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>Cargando...</Text>;
  }

  return (
    <View style={styles.screen}>
      {/*Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CIUDADES</Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <FlatList
          data={ciudades}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cityButton}
              onPress={() =>
                navigation.navigate("Estadios", { ciudadId: item.id })
              }
            >
              <Text style={styles.cityText}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* FOOTER */}
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.footerArrow}>↑</Text>
              </TouchableOpacity>
            </View>
          </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },

  /* HEADER */
  header: {
    height: 60,
    backgroundColor: "#18333A",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },


  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  list: {
    alignItems: "center",
    paddingBottom: 20,
  },

  cityButton: {
    width: 220,
    paddingVertical: 14,
    marginVertical: 10,
    backgroundColor: "#18333A",
    borderRadius: 25,
    alignItems: "center",
  },

  cityText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
  },


  footer: {
    height: 60,
    backgroundColor: "#18333A",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  footerText: {
    color: "#00E676",
    fontSize: 16,
    fontWeight: "bold",
  },
    footerArrow: {
    color: "#00E676",
    fontSize: 28,
    fontWeight: "bold",
  },
});