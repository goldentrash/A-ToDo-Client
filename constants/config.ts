import Constants from "expo-constants";

if (!Constants.expoConfig?.extra?.eas?.projectId)
  throw Error("Missing Project ID");
export const PROJECT_ID = Constants.expoConfig.extra.eas.projectId;

if (!Constants.expoConfig?.extra?.apiServer) throw Error("API Server Invalid");
export const API_SERVER = Constants.expoConfig.extra.apiServer;
