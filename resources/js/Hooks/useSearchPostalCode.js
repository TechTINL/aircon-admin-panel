import { useState, useEffect } from 'react';

function useSearchPostalCode(onSuccess) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let active = true;

    if (searchTerm.length > 4) {
      const fetchAddress = async () => {
        const url = `${import.meta.env.VITE_APP_URL}/postal-code/${searchTerm}`;
        try {
          const response = await fetch(url);
          const { status, address } = await response.json();

          if (status === 'success' && active) {
            onSuccess(address);
          }
        } catch (error) {
          console.error('Failed to fetch address:', error);
        }
      };

      fetchAddress();
    }

    return () => {
      active = false;
    };
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
  };
}

export default useSearchPostalCode;
