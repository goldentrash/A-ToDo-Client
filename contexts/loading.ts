import { createContext } from "react";

export type LoadingContext = {
  startLoading(): void;
  finishLoading(): void;
};

export const LoadingContext = createContext<LoadingContext>({
  startLoading() {
    throw Error("LoadingContext Not Found");
  },
  finishLoading() {
    throw Error("LoadingContext Not Found");
  },
});
