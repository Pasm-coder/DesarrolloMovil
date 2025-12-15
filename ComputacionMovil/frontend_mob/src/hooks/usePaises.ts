import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { getPaises } from "../data/api/PaisApi";
import { Pais } from "../domain/entities/Pais";

export const usePaises = () => {
  const { data, loading, error, execute } = useAsync<Pais[]>();

  useEffect(() => {
    execute(getPaises());
  }, []);

  return {
    paises: data ?? [],
    loading,
    error,
  };
};
