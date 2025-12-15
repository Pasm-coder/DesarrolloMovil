import React from "react";
import { Text, FlatList } from "react-native";
import { useEquipos } from "../../hooks/useEquipos";

export const Equipos = () => {
  const { equipos, loading } = useEquipos(1); 

  if (loading) return <Text>Cargando equipos...</Text>;

  return (
    <FlatList
      data={equipos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={{ padding: 15 }}>{item.nombre}</Text>
      )}
    />
  );
};
