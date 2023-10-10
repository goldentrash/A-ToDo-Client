import { type ExpoPushToken } from "expo-notifications";

export type TaskVO = {
  id: string;
  progress: "todo" | "doing";
  content: string;
  deadline: string;
};

export type TaskDAO = {
  getTaskList(user: Pick<UserVO, "accessToken">): Promise<TaskVO[]>;
  post(
    user: Pick<UserVO, "accessToken">,
    task: Pick<TaskVO, "content" | "deadline">
  ): Promise<TaskVO>;
  patchProgress(
    user: Pick<UserVO, "accessToken">,
    task: Pick<TaskVO, "id">,
    action: "start" | "finish"
  ): Promise<TaskVO>;
  patchContent(
    user: Pick<UserVO, "accessToken">,
    task: Pick<TaskVO, "id" | "content">
  ): Promise<TaskVO["content"]>;
};

export type UserVO = {
  id: string;
  accessToken: string;
  todoList: TaskVO[];
  doing: null | TaskVO;
};

export type UserDAO = {
  getAccessToken(
    user: Pick<UserVO, "id">,
    password: string
  ): Promise<UserVO["accessToken"]>;
  post(user: Pick<UserVO, "id">, password: string): Promise<void>;
  patchPushToken(
    user: Pick<UserVO, "id" | "accessToken">,
    push_token: string | null
  ): Promise<void>;
};

export type DeviceDAO = {
  getPushToken(): Promise<ExpoPushToken>;
};
