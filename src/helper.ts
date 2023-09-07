import { type Task } from "./context";

export const formatTimestamp = (timestamp: number): string => {
  if (!timestamp) throw Error("timestamp Invalid");

  const dateObj = new Date(timestamp);
  return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
};

export const classifyTaskList = (taskList: Task[]) => {
  return taskList.reduce<[Task[], Task | null]>(
    ([todoList, doing], task) => {
      const { progress } = task;
      switch (progress) {
        case "todo":
          todoList = [...todoList, task];
          break;
        case "doing":
          doing = task;
          break;
        default:
          ((_progress: never) => {
            throw Error("unreachable case");
          })(progress);
      }

      return [todoList, doing];
    },
    [[], null]
  );
};
