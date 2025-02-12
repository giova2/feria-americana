
import Loading from '@/components/Loading';
import React, { createContext, useContext, useState, type JSX } from 'react';

type LoadingContextState = {
  setShowLoading: (value: boolean) => void
  showLoading?: boolean
}

export const LoadingContext = createContext<LoadingContextState>({
  setShowLoading: () => {}
});

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider = (props: any): JSX.Element => {
  const [showLoading, setShowLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        setShowLoading,
      }}
    >
      {props?.children}
      {
        showLoading && (
          <Loading />
        )
      }
    </LoadingContext.Provider>
  )
}
