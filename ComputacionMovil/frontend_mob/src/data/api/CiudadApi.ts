import  Api  from "./Api";
import { Ciudad } from "../../domain/entities/Ciudad";

export const getCiudadesByPais = async (
  paisId: number
): Promise<Ciudad[]> => {
  const response = await Api.get<Ciudad[]>(
    `/ciudades/pais/${paisId}`
  );
  return response.data;
};
