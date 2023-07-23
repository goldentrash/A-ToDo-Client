import { useContext, useCallback, useRef, useEffect } from "react";
import Constants from "expo-constants";
import { LoadingContext } from "./contexts";

type RequestOption = {
  method: "GET" | "POST" | "PUT";
  path: string;
  headers?: { [key: string]: string };
  body?: { [key: string]: string };
};
type RequestApi = () => Promise<void>;
type RseponseHandler = (response: unknown) => void;
type ErrorHandler = (error: Error) => void;

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
      throw Error("API server not set up");
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
      .then((res) => {
        if (!res.ok) throw new Error(res.status.toString());
        return res.json();
      })
      .then(responseHandlerRef.current)
      .catch(errorHandlerRef.current)
      .finally(() => {
        setLoadingCount((prev) => prev - 1);
      });
  }, [setLoadingCount]);

  return requestApi;
};

export const useUpdateEffect = (
  effect: () => void,
  dependencies?: React.DependencyList | undefined
) => {
  const isInitialMountRef = useRef(true);

  const effectRef = useRef(effect);
  effectRef.current = effect;

  const dependenciesRef = useRef(dependencies);
  dependenciesRef.current = dependencies;

  useEffect(() => {
    if (isInitialMountRef.current) isInitialMountRef.current = false;
    else effectRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependenciesRef.current);
};
