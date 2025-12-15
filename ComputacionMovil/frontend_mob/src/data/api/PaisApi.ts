import  Api  from "./Api";
import { Pais } from "../../domain/entities/Pais";

export const getPaises = async (): Promise<Pais[]> => {
  const response = await Api.get<Pais[]>("/paises");
  return response.data;
};
