import  Api  from "./Api";
import { Equipo } from "../../domain/entities/Equipo";

export const getEquiposByPais = async (
  paisId: number
): Promise<Equipo[]> => {
  const response = await Api.get<Equipo[]>(
    `/equipos/pais/${paisId}`
  );
  return response.data;
};
