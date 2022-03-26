import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getTruyen } from '../api';
import { Truyen } from './types';
import SpeedDial from './SpeedDial';

interface TruyenContextType {
  truyen: Truyen | undefined;
}

const TruyenContext = React.createContext<TruyenContextType>({
  truyen: undefined,
});

export const TruyenPage = () => {
  const { slug } = useParams();
  const [truyen, setTruyen] = useState<Truyen>();

  useEffect(() => {
    if (slug) {
      getTruyen(slug).then((truyenObj) => {
        setTruyen(truyenObj);
      });
    }
  }, [slug]);

  return (
    <TruyenContext.Provider value={{ truyen }}>
      <SpeedDial />
      <Outlet />
    </TruyenContext.Provider>
  );
};

export { TruyenContext };
