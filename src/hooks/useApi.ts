
import React from 'react';

type ApiError = {
    message: string;
    status: number;
    code?: string;
}

const useApi = <T>(url: string) => {
    const [data, setData] = React.useState<T | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<ApiError | null>(null);
  
    React.useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await fetch(url);
          if (!response.ok) {
            const errorData: ApiError = await response.json();
            throw errorData;
          }
          const json = await response.json();
          setData(json);
        } catch (error) {
          setError(error as ApiError);
        }
  
        setIsLoading(false);
      };
  
      fetchData();
    }, [url]);
  
    return { data, isLoading, error };
  };
  
  export default useApi;