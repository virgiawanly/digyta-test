import { useEffect, useState } from 'react';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: any) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

export default useMediaQuery;
