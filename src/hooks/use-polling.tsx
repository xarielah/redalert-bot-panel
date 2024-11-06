import { useEffect, useRef, useState } from "react";

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

  const abortController = useRef(new AbortController());
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isMounted = useRef(true);
  const isRequestInProgress = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    fetchData();

    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      abortController.current.abort();
    };
  }, []);

  const scheduleNextFetch = () => {
    if (isMounted.current) {
      timeoutRef.current = setTimeout(() => {
        fetchData();
      }, interval);
    }
  };

  const fetchData = async () => {
    // If a request is already in progress, don't start another one
    if (isRequestInProgress.current) {
      return;
    }

    // Clear any existing scheduled fetches
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    isRequestInProgress.current = true;

    try {
      // Create a new AbortController for each request
      abortController.current = new AbortController();

      const response = await fetch(url, {
        ...options,
        signal: abortController.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (isMounted.current) {
        setData(responseData);
        setError(undefined);
        onSuccess?.(responseData);
      }
    } catch (error: any) {
      if (isMounted.current && !abortController.current.signal.aborted) {
        setError(error);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
        isRequestInProgress.current = false;
        // Schedule the next fetch after this one completes
        scheduleNextFetch();
      }
    }
  };

  return {
    data,
    error,
    isLoading: loading,
    refetch: fetchData, // Exposing refetch function for manual polling
  };
}
