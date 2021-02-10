import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const prevUrls = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ( areEqual( prevUrls.current, urls ) ) {
        setLoading(false);
        return
    }
    prevUrls.current = urls;
    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

function areEqual( arr1, arr2 ) {
    return (
        arr1.length === arr2.length &&
            arr1.every(( val, i ) => val === arr2[i])
    );
}