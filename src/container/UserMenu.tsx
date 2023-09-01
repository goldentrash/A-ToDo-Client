import { useState, useCallback, useContext, useMemo, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { UserContext, type Task, type User } from "../context";
import {
  useApi,
  type RequestOption,
  type RseponseHandler,
  type ErrorHandler,
} from "../hook";
import { FloatingButton, RegisterTaskModal } from "../view";
import { formatTimestamp } from "../helper";
import { WaitingPage, WorkingPage } from "../container";

export const UserMenu = () => {
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const deadlineLimitTimestamp = useMemo(
    () => Date.now() + 1_000 * 60 * 60 * 24 * 30,
    []
  );
  const deadlineLimitString = useMemo(
    () => formatTimestamp(deadlineLimitTimestamp),
    [deadlineLimitTimestamp]
  );

  const [contentErrMsg, setContentErrMsg] = useState("");
  const [deadlineErrMsg, setDeadlineErrMsg] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => {
    setContent("");
    setDeadline("");
    setContentErrMsg("");
    setDeadlineErrMsg("");
    setModalVisible(true);
  }, []);
  const closeModal = useCallback(() => {
    setContent("");
    setDeadline("");
    setContentErrMsg("");
    setDeadlineErrMsg("");
    setModalVisible(false);
  }, []);

  const { user, setUser } = useContext(UserContext);
  if (!user) throw Error("unreachable case");

  const getTasksOpt = useMemo<RequestOption>(
    () => ({
      path: `/tasks?sort=deadline&progress=todo&progress=doing`,
      method: "GET",
      headers: { Authorization: `Bearer ${user.token}` },
    }),
    [user]
  );
  const getTasksResHandler = useCallback<RseponseHandler>(
    ({ taskList }) => {
      const [todoList, doing] = (taskList as Task[]).reduce<
        [Task[], Task | null]
      >(
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

      setUser({
        ...user,
        state: doing ? "working" : "rest",
        todoList,
        doing,
      } as User);
    },
    [user, setUser]
  );
  const getTasksErrHandler = useCallback<ErrorHandler>(
    () =>
      ToastAndroid.show(
        "Fail to Get Tasks, please retry again",
        ToastAndroid.LONG
      ),
    []
  );
  const getTasksReq = useApi(
    getTasksOpt,
    getTasksResHandler,
    getTasksErrHandler
  );
  const getTasks = useCallback(() => {
    getTasksReq();
  }, [getTasksReq]);
  useEffect(getTasks, [getTasks]);

  const registerTaskReqOpt = useMemo<RequestOption>(
    () => ({
      path: `/tasks`,
      method: "POST",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: {
        content,
        deadline: formatTimestamp(
          Date.parse(deadline) || deadlineLimitTimestamp
        ),
      },
    }),
    [user, content, deadline, deadlineLimitTimestamp]
  );
  const registerTaskResHandler = useCallback<RseponseHandler>(
    ({ task }) => {
      setUser({
        ...user,
        todoList: [...user.todoList, task].sort(
          ({ deadline: d1 }, { deadline: d2 }) => {
            if (d1 > d2) return 1;
            if (d1 < d2) return -1;
            return 0;
          }
        ),
      });
      closeModal();
    },
    [user, setUser, closeModal]
  );
  const registerTaskErrHandler = useCallback<ErrorHandler>(
    () =>
      ToastAndroid.show(
        "Fail to Register Task, please retry again",
        ToastAndroid.LONG
      ),
    []
  );
  const registerTaskReq = useApi(
    registerTaskReqOpt,
    registerTaskResHandler,
    registerTaskErrHandler
  );
  const registerTask = useCallback(() => {
    setContentErrMsg("");
    setDeadlineErrMsg("");

    if (!content) return setContentErrMsg("content Required");

    const timestamp =
      deadline === "" ? deadlineLimitTimestamp : Date.parse(deadline);
    if (!timestamp) return setDeadlineErrMsg("deadline Invalid");
    if (timestamp < Date.now())
      return setDeadlineErrMsg("deadline Cannot be Past");
    if (timestamp > deadlineLimitTimestamp)
      return setDeadlineErrMsg("Beyond 30 Days are Not Possibe");

    registerTaskReq();
  }, [content, deadline, deadlineLimitTimestamp, registerTaskReq]);

  return (
    <>
      {user.state === "rest" ? <WaitingPage /> : <WorkingPage />}

      <FloatingButton title="Register Task" openModal={openModal} />
      <RegisterTaskModal
        visible={modalVisible}
        onSubmit={registerTask}
        onCancel={closeModal}
        content={content}
        onUpdateContent={setContent}
        contentErrMsg={contentErrMsg}
        deadline={deadline}
        defaultDeadline={deadlineLimitString}
        onUpdateDeadline={setDeadline}
        deadlineErrMsg={deadlineErrMsg}
      />
    </>
  );
};
