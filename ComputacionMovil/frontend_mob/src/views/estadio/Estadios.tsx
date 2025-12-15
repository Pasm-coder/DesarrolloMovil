import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useEstadios } from "../../hooks/useEstadios";

export const Estadios = ({ route, navigation }: any) => {
  const ciudadId = route?.params?.ciudadId;
  const { estadios, loading } = useEstadios(ciudadId);

  if (loading) {
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>
        Cargando estadios...
      </Text>
    );
  }

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Estadio</Text>
      </View>

      {/* BANDERA */}
      <View style={styles.flagContainer}>
        <Image
          source={require("../../assets/paises/colombia.png")}
          style={styles.flag}
        />
      </View>

      {/* LISTA DE ESTADIOS */}
      <FlatList
        data={estadios}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Partidos", { estadioId: item.id })
            }
          >
            <Text style={styles.cardText}>{item.nombre}</Text>

            {item.logo && (
              <Image source={item.logo} style={styles.logo} />
            )}
          </TouchableOpacity>
        )}
      />

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
    backgroundColor: "#FFFFFF",
  },

  /* HEADER */
  header: {
    height: 80,
    backgroundColor: "#18333A",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  /* BANDERA */
  flagContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  flag: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  /* LISTA */
  list: {
    alignItems: "center",
    paddingBottom: 100,
  },

  card: {
    width: "85%",
    backgroundColor: "#0F4C5C",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },

  cardText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  /* FOOTER */
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#18333A",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  footerArrow: {
    color: "#00E676",
    fontSize: 28,
    fontWeight: "bold",
  },
});
