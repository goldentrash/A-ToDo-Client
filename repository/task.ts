import { TaskVO, type TaskDAO } from "../service";
import Constants from "expo-constants";

if (!Constants.expoConfig?.extra?.apiServer) throw Error("API Server Invalid");
const API_SERVER = Constants.expoConfig.extra.apiServer;

export const taskRepo: TaskDAO = {
  getTaskList({ token }) {
    const option = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return new Promise<TaskVO[]>((resolve, reject) => {
      fetch(
        `${API_SERVER}/tasks?sort=deadline&progress=todo&progress=doing`,
        option
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          return resolve(res.data.taskList);
        })
        .catch(reject);
    });
  },

  post({ token }, { content, deadline }) {
    const option = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        deadline,
      }),
    };

    return new Promise<TaskVO>((resolve, reject) => {
      fetch(`${API_SERVER}/tasks`, option)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          return resolve(res.data.task);
        })
        .catch(reject);
    });
  },

  patchProgress({ token }, { id: taskId }, action) {
    const option = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return new Promise<TaskVO>((resolve, reject) => {
      fetch(`${API_SERVER}/tasks/${taskId}?action=${action}`, option)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          return resolve(res.data.task);
        })
        .catch(reject);
    });
  },

  patchContent({ token }, { id: taskId, content }) {
    const option = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    };

    return new Promise<TaskVO>((resolve, reject) => {
      fetch(`${API_SERVER}/tasks/${taskId}/content`, option)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          return resolve(res.data.task);
        })
        .catch(reject);
    });
  },
};
