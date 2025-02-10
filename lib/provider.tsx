import { ReactElement, useMemo, useState } from "react";
import { AxiosContext } from "./context";
import axios, { AxiosHeaderValue, CreateAxiosDefaults } from "axios";

export type AxiosProviderType = {
  baseURL: CreateAxiosDefaults["baseURL"];
  withCredentials?: CreateAxiosDefaults["withCredentials"];
  children?: ReactElement | ReactElement[];
};
export function AxiosProvider({
  children,
  baseURL,
  withCredentials,
}: AxiosProviderType) {
  const [headers, setHeaders] = useState<CreateAxiosDefaults["headers"]>();

  const addHeader = (name: string, value: AxiosHeaderValue) => {
    setHeaders((prev) => ({ ...prev, [name]: value }));
  };

  const removeHeader = (name: string) => {
    setHeaders((prev) => {
      const rest: any = { ...prev };
      delete rest[name];
      return rest;
    });
  };

  const instance = useMemo(() => {
    return axios.create({
      baseURL,
      withCredentials,
      headers,
    });
  }, [baseURL, withCredentials, headers]);

  return (
    <AxiosContext.Provider value={{ instance, addHeader, removeHeader }}>
      {children}
    </AxiosContext.Provider>
  );
}
