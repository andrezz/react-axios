import { AxiosHeaderValue, AxiosInstance } from "axios";
import { createContext, useContext } from "react";

export type AxiosContextType = {
    instance: AxiosInstance;
    addHeader: (name: string, value: AxiosHeaderValue) => void;
    removeHeader: (name: string) => void;
}

export const AxiosContext = createContext<AxiosContextType|undefined>(undefined);

export function useAxios(){
    const context = useContext(AxiosContext);
    if(!context) throw new Error("useAxiosInstance must be used within an AxiosProvider");
    return context;
}