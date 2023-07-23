import { createContext } from "react";

export const LoadingContext = createContext<{
  loadingCount: number;
  setLoadingCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  loadingCount: 0,
  setLoadingCount() {
    throw Error("LoadingContext not found");
  },
});

export type Todo = {
  id: string;
  content: string;
  deadline: string;
};

export type Doing = Todo & {
  memo: string;
};

export type User = {
  id: string;
  token: string; // check needed. what type jwt?
  todoList: Todo[];
} & (
  | {
      state: "rest";
    }
  | { state: "working"; doing: Doing }
);

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser() {
    throw Error("UserContext not found");
  },
});
