import { useState } from "react";

export const useAsync = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = async (promise: Promise<T>) => {
    try {
      setLoading(true);
      const response = await promise;
      setData(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};
