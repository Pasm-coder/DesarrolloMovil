import { useEffect, useState } from "react";
import { partidos } from "../data/mock/partidos.mock";
import { Partido } from "../domain/entities/Partido";

export const usePartidos = (estadioId: number) => {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const filtrados = partidos.filter(
      (p: Partido) => p.estadioId === estadioId
    );

    setPartidos(filtrados);
    setLoading(false);
  }, [estadioId]);

  return { partidos, loading };
};
