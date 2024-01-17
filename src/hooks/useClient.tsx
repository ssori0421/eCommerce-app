import { useEffect, useState } from 'react';

export const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []); // 최초 렌더링 시에만 실행

  return isClient;
};
