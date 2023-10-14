import { createContext } from "react";
import { type UserVO } from "../services";

export type User = UserVO | null;
export type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser() {
    throw Error("UserContext Not Found");
  },
});
