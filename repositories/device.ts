import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { type DeviceDAO } from "../services";
import { CHANNEL_ID, CHANNEL_IMPORTANCE, CHANNEL_NAME } from "../constants";

if (!Constants.expoConfig?.extra?.eas?.projectId)
  throw Error("Missing Project ID");
const PROJECT_ID = Constants.expoConfig?.extra?.eas?.projectId;

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
