import { type UserDAO } from "../services";
import Constants from "expo-constants";

if (!Constants.expoConfig?.extra?.apiServer) throw Error("API Server Invalid");
const API_SERVER = Constants.expoConfig.extra.apiServer;

export const userRepo: UserDAO = {
  getAccessToken({ id }, password) {
    const option = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };

    return new Promise<string>((resolve, reject) => {
      fetch(`${API_SERVER}/users/${id}/access-token`, option)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          return resolve(res.data.access_token);
        })
        .catch(reject);
    });
  },

  post({ id }, password) {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    };

    return new Promise<void>((resolve, reject) => {
      fetch(`${API_SERVER}/users`, option)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          resolve();
        })
        .catch(reject);
    });
  },

  patchPushToken({ id, accessToken }, push_token) {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ push_token }),
    };

    return new Promise<void>((resolve, reject) => {
      fetch(`${API_SERVER}/users/${id}/push-token`, option)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          resolve();
        })
        .catch(reject);
    });
  },
};
