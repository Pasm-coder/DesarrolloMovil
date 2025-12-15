import React from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { usePartidos } from "../../hooks/usePartidos";

export const Partidos = ({ route }: any) => {
  const { estadioId } = route.params;
  const { partidos, loading } = usePartidos(estadioId);

  if (loading) return <Text>Cargando partidos...</Text>;

return (
  <View style={{ flex: 1, padding: 15 }}>
    <FlatList
      data={partidos}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.partidoContainer}>
          <Text style={styles.fecha}>{item.fecha}</Text>

          <View style={styles.partido}>
            <Text style={styles.textoPartido}>
              <Text style={styles.equipoLocal}>{item.equipoLocal}</Text>{" "}
              {item.resultadoLocal} - {item.resultadoVisitante}{" "}
              <Text style={styles.equipoVisitante}>
                {item.equipoVisitante}
              </Text>
            </Text>
          </View>
        </View>
      )}
    />
  </View>
);

};

const styles = StyleSheet.create({
  partidoContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  fecha: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  partido: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoPartido: {
    fontSize: 16,
    fontWeight: "bold",
  },
  equipoLocal: {
    color: "#0055A4", 
  },
  equipoVisitante: {
    color: "#D50032", 
  },
});
