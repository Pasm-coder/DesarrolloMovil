import { useEffect, useState } from "react";
import { estadiosMock } from "../data/mock/estadios.mock";

export const useEstadios = (ciudadId?: number) => {
  const [estadios, setEstadios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ciudadId) return;

    setLoading(true);

    const data = estadiosMock.filter(
      (estadio) => estadio.ciudadId === ciudadId
    );

    setTimeout(() => {
      setEstadios(data);
      setLoading(false);
    }, 500); 
  }, [ciudadId]);

  return { estadios, loading };
};