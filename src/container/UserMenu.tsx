import { useState, useCallback, useContext, useMemo, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { UserContext } from "../context";
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
  const deadlineLimit = useMemo(
    () => Date.now() + 1_000 * 60 * 60 * 24 * 30,
    []
  );
  const defaultDeadline = useMemo(
    () => formatTimestamp(deadlineLimit),
    [deadlineLimit]
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
      path: `/tasks`,
      method: "GET",
      headers: { Authorization: `Bearer ${user.token}` },
    }),
    [user]
  );
  const getTasksResHandler = useCallback<RseponseHandler>(
    ({ todoList, doing, doneList }) =>
      setUser({
        ...user,
        state: doing ? "working" : "rest",
        todoList,
        ...(doing && { doing }),
        doneList,
      }),
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
      body: { content, deadline: deadline === "" ? defaultDeadline : deadline },
    }),
    [user, content, deadline, defaultDeadline]
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

    const timestamp = deadline === "" ? deadlineLimit : Date.parse(deadline);
    if (!timestamp) return setDeadlineErrMsg("deadline Invalid");
    if (timestamp < Date.now())
      return setDeadlineErrMsg("deadline Cannot be Past");
    if (timestamp > deadlineLimit)
      return setDeadlineErrMsg("Beyond 30 Days are Not Possibe");

    registerTaskReq();
  }, [content, deadline, deadlineLimit, registerTaskReq]);

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
        defaultDeadline={defaultDeadline}
        onUpdateDeadline={setDeadline}
        deadlineErrMsg={deadlineErrMsg}
      />
    </>
  );
};