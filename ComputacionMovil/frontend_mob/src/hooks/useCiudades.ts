import { useEffect, useState } from "react";
import { CIUDADES } from "../data/mock/ciudades.mock";

export const useCiudades = (paisId: number) => {
  const [ciudades, setCiudades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const data = CIUDADES.filter(
      (ciudad) => ciudad.paisId === paisId
    );

    setTimeout(() => {
      setCiudades(data);
      setLoading(false);
    }, 500); 
  }, [paisId]);

  return { ciudades, loading };
};
