import { AxiosHeaderValue } from 'axios';
import { AxiosInstance } from 'axios';
import { Context } from 'react';
import { CreateAxiosDefaults } from 'axios';
import { JSX } from 'react/jsx-runtime';
import { ReactElement } from 'react';
import { ResponseType as ResponseType_2 } from 'axios';

export declare const AxiosContext: Context<AxiosContextType | undefined>;

export declare type AxiosContextType = {
    instance: AxiosInstance;
    addHeader: (name: string, value: AxiosHeaderValue) => void;
    removeHeader: (name: string) => void;
};

export declare function AxiosProvider({ children, baseURL, withCredentials, }: AxiosProviderType): JSX.Element;

export declare type AxiosProviderType = {
    baseURL: CreateAxiosDefaults["baseURL"];
    withCredentials?: CreateAxiosDefaults["withCredentials"];
    children?: ReactElement | ReactElement[];
};

export declare type ExecuteRequestProps<T, D> = {
    data?: T;
    path?: string;
    onSuccess?: (response?: D) => void;
    onError?: (message: string) => void;
    onProgress?: (value: number) => void;
    responseType?: ResponseType_2;
};

export declare function useAxios(): AxiosContextType;

export declare function useDelete<T = any, D = any>(props?: Omit<UseRequestProps, "method">): {
    data: T | undefined;
    isLoading: boolean;
    execute: (params?: ExecuteRequestProps<D, T> | undefined) => Promise<T | undefined>;
};

export declare function useGet<T = any, D = any>(props?: Omit<UseRequestProps, "method">): {
    data: T | undefined;
    isLoading: boolean;
    execute: (params?: ExecuteRequestProps<D, T> | undefined) => Promise<T | undefined>;
};

export declare function usePost<T = any, D = any>(props?: Omit<UseRequestProps, "method">): {
    data: T | undefined;
    isLoading: boolean;
    execute: (params?: ExecuteRequestProps<D, T> | undefined) => Promise<T | undefined>;
    progress: number;
};

export declare function usePut<T = any, D = any>(props?: Omit<UseRequestProps, "method">): {
    data: T | undefined;
    isLoading: boolean;
    execute: (params?: ExecuteRequestProps<D, T> | undefined) => Promise<T | undefined>;
};

export declare function useRequest<T = any, D = any>(props: UseRequestProps): {
    data: D | undefined;
    isLoading: boolean;
    execute: (params?: ExecuteRequestProps<T, D>) => Promise<D | undefined>;
    progress: number;
};

export declare type UseRequestProps = {
    method: string;
    path?: string;
};

export { }
