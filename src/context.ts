import { createContext } from "react";

export const LoadingContext = createContext<{
  loadingCount: number;
  setLoadingCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  loadingCount: 0,
  setLoadingCount() {
    throw Error("LoadingContext Not Found");
  },
});

export type Task = {
  id: string;
  progress: "todo" | "doing";
  content: string;
  deadline: string;
  memo: string;
};

export type User = {
  id: string;
  token: string;
  todoList: Task[];
} & ({ state: "rest"; doing: null } | { state: "working"; doing: Task });

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser() {
    throw Error("UserContext Not Found");
  },
});
