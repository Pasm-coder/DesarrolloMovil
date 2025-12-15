import  Api  from "./Api";
import { User } from "../../domain/entities/User";

export const loginRequest = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await Api.get<User>(`/users-mail/${email}`);

  const user = response.data;

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (user.password !== password) {
    throw new Error("Contraseña incorrecta");
  }

  if (user.status !== 1) {
    throw new Error("Usuario inactivo");
  }

  return user;
};