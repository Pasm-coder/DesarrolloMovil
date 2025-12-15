import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";


const paises = [
  { id: 1, flag: require("../../assets/paises/colombia.png") },
  { id: 2, flag: require("../../assets/paises/argentina.png") },
  { id: 3, flag: require("../../assets/paises/españa.png") },
  { id: 4, flag: require("../../assets/paises/brasil.png") },
  { id: 5, flag: require("../../assets/paises/mexico.png") },
  { id: 6, flag: require("../../assets/paises/chile.png") },
  { id: 7, flag: require("../../assets/paises/peru.png") },
  { id: 8, flag: require("../../assets/paises/uruguay.png") },];

export const Paises = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>PAÍSES</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.container}>
        

        <View style={styles.content}>
          <View style={styles.grid}>
            {paises.map((pais) => (
              <TouchableOpacity
                key={pais.id}
                style={styles.item}
                onPress={() =>
                  navigation.navigate("Ciudades", { paisId: pais.id })
                }
              >
                <Image source={pais.flag} style={styles.flag} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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

  /* CONTENIDO */
  container: {
    flex: 1,
    flexDirection: "row",
  },

  sideBar: {
    width: 60,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
  },

  sideText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    transform: [{ rotate: "-90deg" }],
  },

  content: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  item: {
    width: 100,
    height: 120,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  flag: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },

  countryName: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },

  /* FOOTER */
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