import { useEffect, useState } from "react";

interface IUsePolling<T> {
  url: string;
  options?: RequestInit;
  interval?: number;
  onSuccess?: (data: T) => void;
}

export default function usePolling<T>({
  url,
  onSuccess,
  options = {},
  interval = 10 * 1000,
}: IUsePolling<T>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
    const i = setInterval(() => {
      fetchData();
    }, interval);
    return () => clearInterval(i);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setData(data);
      onSuccess && onSuccess(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, isLoading: loading };
}
