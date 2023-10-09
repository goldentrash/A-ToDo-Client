import { type UserVO } from "./type";
import { userRepo, taskRepo } from "../repositories";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

if (!Constants.expoConfig?.extra?.eas?.projectId)
  throw Error("Missing Project ID");
const PROJECT_ID = Constants.expoConfig?.extra?.eas?.projectId;

const registerPushNotifications = async () => {
  await Notifications.setNotificationChannelAsync("push", {
    name: "push channel",
    importance: Notifications.AndroidImportance.DEFAULT,
  });

  const settings = await Notifications.getPermissionsAsync();
  if (
    !settings.granted &&
    !(await Notifications.requestPermissionsAsync()).granted
  )
    throw Error("Permission Denied");

  const pushToken = await Notifications.getExpoPushTokenAsync({
    projectId: PROJECT_ID,
  });
  console.log(pushToken);
  return pushToken;
};

export const userService = {
  async signIn(user: Pick<UserVO, "id">, password: string): Promise<UserVO> {
    const accessToken = await userRepo.getAccessToken(user, password);

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
