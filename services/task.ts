import { TaskVO, type UserVO } from "./type";
import { taskRepo } from "../repositories";

export const taskService = {
  async register(
    user: Pick<UserVO, "token">,
    task: Pick<TaskVO, "content" | "deadline">
  ): Promise<TaskVO> {
    return await taskRepo.post(user, task);
  },

  async start(
    user: Pick<UserVO, "token">,
    task: Pick<TaskVO, "id">
  ): Promise<TaskVO> {
    return await taskRepo.patchProgress(user, task, "start");
  },

  async finish(
    user: Pick<UserVO, "token">,
    task: Pick<TaskVO, "id">
  ): Promise<TaskVO> {
    return await taskRepo.patchProgress(user, task, "finish");
  },

  async update(
    user: Pick<UserVO, "token">,
    task: Pick<TaskVO, "id" | "content">
  ): Promise<TaskVO> {
    return await taskRepo.patchContent(user, task);
  },
};
