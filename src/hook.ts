import { useContext, useCallback, useRef } from "react";
import Constants from "expo-constants";
import { LoadingContext } from "./context";

export type RequestOption = {
  method: "GET" | "POST" | "PUT" | "PATCH";
  path: string;
  headers?: { [key: string]: string };
  body?: { [key: string]: string };
};
export type RequestApi = () => Promise<void>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RseponseHandler = (response: { [key: string]: any }) => void;
export type ErrorHandler = (error: Error) => void;

export const useApi = (
  requestOption: RequestOption,
  responseHandler: RseponseHandler,
  errorHandler: ErrorHandler
): RequestApi => {
  const requestOptionRef = useRef(requestOption);
  requestOptionRef.current = requestOption;

  const responseHandlerRef = useRef(responseHandler);
  responseHandlerRef.current = responseHandler;

  const errorHandlerRef = useRef(errorHandler);
  errorHandlerRef.current = errorHandler;

  const { setLoadingCount } = useContext(LoadingContext);
  const requestApi = useCallback(() => {
    setLoadingCount((prev) => prev + 1);

    if (!Constants.expoConfig || !Constants.expoConfig.extra)
      throw Error("API Server Invalid");
    const { path, method, headers, body } = requestOptionRef.current;

    return fetch(Constants.expoConfig.extra.apiServer + path, {
      method,
      headers: {
        Accept: "application/json",
        ...(body && { "Content-Type": "application/json" }),
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw Error(res.error);
        return res.data;
      })
      .then(responseHandlerRef.current)
      .catch(errorHandlerRef.current)
      .finally(() => {
        setLoadingCount((prev) => prev - 1);
      });
  }, [setLoadingCount]);

  return requestApi;
};
