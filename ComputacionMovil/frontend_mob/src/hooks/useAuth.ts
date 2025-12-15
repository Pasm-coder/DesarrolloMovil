import { useState } from "react";
import { User } from "../domain/entities/User";
import { loginRequest } from "../data/api/AuthApi";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const loggedUser = await loginRequest(email, password);
      setUser(loggedUser);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    login,
    loading,
    error,
  };
};