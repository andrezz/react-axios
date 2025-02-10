import { useState } from "react";
import { useAxios } from "./context";
import { ResponseType } from "axios";

export type UseRequestProps = {
  method: string;
  path?: string;
};

export type ExecuteRequestProps<T, D> = {
  data?: T;
  path?: string;
  onSuccess?: (response?: D) => void;
  onError?: (message: string) => void;
  onProgress?: (value: number) => void;
  responseType?: ResponseType;
};

export function useRequest<T = any, D = any>(props: UseRequestProps) {
  const { instance } = useAxios();

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<D>();
  const [progress, setProgress] = useState(0);

  const execute = async (
    params?: ExecuteRequestProps<T, D>
  ) => {
    try {
      setLoading(true);
      const result = await instance.request<D>({
        url: props.path || params?.path,
        method: props.method,
        ...(["get", "delete"].includes(props.method.toLowerCase()) && {
          params: params?.data,
        }),
        ...(["post", "put"].includes(props.method.toLowerCase()) && {
          data: params?.data,
        }),
        ...(params?.responseType && { responseType: params.responseType }),
        onUploadProgress: (event) => {
          if (event.total) {
            const value = Math.round((event.loaded * 100) / event.total);
            setProgress(value);
            params?.onProgress && params.onProgress(value);
          }
        },
      });
      params?.onSuccess && params.onSuccess(result.data);
      setData(result.data);
      setLoading(false);
      return result.data;
    } catch (err: any) {
      params?.onError &&
        params.onError(err.response?.data?.message || err.message);
      setLoading(false);
      return undefined;
    }
  };

  return { data, isLoading, execute, progress };
}

export function useGet<T = any, D = any>(
  props?: Omit<UseRequestProps, "method">
) {
  const { data, execute, isLoading } = useRequest<D, T>({
    ...props,
    method: "get",
  });

  return { data, isLoading, execute };
}

export function usePost<T = any, D = any>(
  props?: Omit<UseRequestProps, "method">
) {
  const { data, execute, isLoading, progress } = useRequest<D, T>({
    ...props,
    method: "post",
  });

  return { data, isLoading, execute, progress };
}

export function usePut<T = any, D = any>(
  props?: Omit<UseRequestProps, "method">
) {
  const { data, execute, isLoading } = useRequest<D, T>({
    ...props,
    method: "put",
  });

  return { data, isLoading, execute };
}

export function useDelete<T = any, D = any>(
  props?: Omit<UseRequestProps, "method">
) {
  const { data, execute, isLoading } = useRequest<D, T>({
    ...props,
    method: "delete",
  });

  return { data, isLoading, execute };
}
