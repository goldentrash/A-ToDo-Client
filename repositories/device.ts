import * as Notifications from "expo-notifications";
import { type DeviceDAO } from "../services";
import {
  CHANNEL_ID,
  CHANNEL_IMPORTANCE,
  CHANNEL_NAME,
  PROJECT_ID,
} from "../constants";

export const deviceRepo: DeviceDAO = {
  async getPushToken() {
    // set push channel
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: CHANNEL_NAME,
      importance: CHANNEL_IMPORTANCE,
    });

    // get permission
    const settings = await Notifications.getPermissionsAsync();
    if (
      !settings.granted &&
      !(await Notifications.requestPermissionsAsync()).granted
    )
      throw Error("Permission Denied");

    // issue push token
    return await Notifications.getExpoPushTokenAsync({
      projectId: PROJECT_ID,
    });
  },
};
