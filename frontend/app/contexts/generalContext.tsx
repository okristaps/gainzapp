import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import moment from "moment";
import React, { createContext, useContext, useMemo, useState } from "react";

interface GeneralContexProps {
  children: React.ReactNode;
}

interface GeneralContextInt {
  termsData: any;
  loading: boolean;
}

export const GeneralContex = createContext<GeneralContextInt>({
  termsData: {},
  loading: false,
});

const GeneralContexManager: React.FC<GeneralContexProps> = ({ children }) => {
  const { isLoading, data } = useQuery({
    retry: 0,

    queryKey: ["terms"],
    queryFn: async () =>
      await getBe({
        path: `/assets/terms`,
      }),
  });

  const values: GeneralContextInt = useMemo(() => {
    return {
      termsData: data,
      loading: isLoading,
    };
  }, [data, isLoading]);

  return <GeneralContex.Provider value={values}>{children}</GeneralContex.Provider>;
};

export default GeneralContexManager;
