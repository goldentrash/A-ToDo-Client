import { type ExpoPushToken } from "expo-notifications";

export type TaskVO = {
  id: string;
  progress: "todo" | "doing";
  content: string;
  deadline: string;
};

export type TaskDAO = {
  getTaskList(user: Pick<UserVO, "token">): Promise<TaskVO[]>;
  post(
    user: Pick<UserVO, "token">,
    task: Pick<TaskVO, "content" | "deadline">
  ): Promise<TaskVO>;
  patchProgress(
    user: Pick<UserVO, "token">,
    task: Pick<TaskVO, "id">,
    action: "start" | "finish"
  ): Promise<TaskVO>;
  patchContent(
    user: Pick<UserVO, "token">,
    task: Pick<TaskVO, "id" | "content">
  ): Promise<TaskVO>;
};

export type UserVO = {
  id: string;
  token: string;
  todoList: TaskVO[];
  doing: null | TaskVO;
};

export type UserDAO = {
  getAccessToken(
    user: Pick<UserVO, "id">,
    password: string
  ): Promise<UserVO["token"]>;
  post(user: Pick<UserVO, "id">, password: string): Promise<void>;
  updatePushToken(
    user: Pick<UserVO, "id">,
    push_token: string | null
  ): Promise<void>;
};

export type DeviceDAO = {
  getPushToken(): Promise<ExpoPushToken>;
};
