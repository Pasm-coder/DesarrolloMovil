import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { getEquiposByPais } from "../data/api/EquipoApi";
import { Equipo } from "../domain/entities/Equipo";

export const useEquipos = (paisId: number) => {
  const { data, loading, error, execute } = useAsync<Equipo[]>();

  useEffect(() => {
    if (paisId) {
      execute(getEquiposByPais(paisId));
    }
  }, [paisId]);

  return {
    equipos: data ?? [],
    loading,
    error,
  };
};
