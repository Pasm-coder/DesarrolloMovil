import  Api  from "./Api";
import { Partido } from "../../domain/entities/Partido";

export const getPartidosByEstadio = async (
  estadioId: number
): Promise<Partido[]> => {
  const response = await Api.get<Partido[]>(
    `/partidos/estadio/${estadioId}`
  );
  return response.data;
};
