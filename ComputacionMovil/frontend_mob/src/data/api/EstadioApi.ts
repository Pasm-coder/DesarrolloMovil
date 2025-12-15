import  Api  from "./Api";
import { Estadio } from "../../domain/entities/Estadio";

export const getEstadiosByCiudad = async (
  ciudadId: number
): Promise<Estadio[]> => {
  const response = await Api.get<Estadio[]>(
    `/estadios/ciudad/${ciudadId}`
  );
  return response.data;
};
