import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useHash = () => {
  //next/router
  const router = useRouter();

  //current window hash
  const [hash, setHash] = useState(typeof window === 'undefined' ? '#' : window.location.hash || '#');

  //update window hash
  const updateWindowHash = useCallback(() => {
    setHash(window.location.hash || '#');
  }, []);

  useEffect(() => {
    router.events.on('hashChangeComplete', updateWindowHash);
    return () => router.events.off('hashChangeComplete', updateWindowHash);
  }, [updateWindowHash, router.events]);

  return hash;
};

export default useHash;
