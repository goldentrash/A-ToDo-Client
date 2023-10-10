import { type UserVO } from "./type";
import { userRepo, taskRepo, deviceRepo } from "../repositories";

export const userService = {
  async signIn(user: Pick<UserVO, "id">, password: string): Promise<UserVO> {
    const accessToken = await userRepo.getAccessToken(user, password);

    const { data: pushToken } = await deviceRepo.getPushToken();
    await userRepo.updatePushToken(user, pushToken);

    const taskList = await taskRepo.getTaskList({ token: accessToken });
    const [todoList, doing] = taskList.reduce<
      [UserVO["todoList"], UserVO["doing"]]
    >(
      ([todoList, doing], task) => {
        switch (task.progress) {
          case "todo":
            return [[...todoList, task], doing];
          case "doing":
            return [todoList, task];
          default:
            ((_progress: never) => {
              throw Error("unreachable case");
            })(task.progress);
        }
      },
      [[], null]
    );

    return {
      id: user.id,
      token: accessToken,
      todoList,
      doing,
    };
  },

  async signUp(user: Pick<UserVO, "id">, password: string): Promise<void> {
    await userRepo.post(user, password);
  },
};
