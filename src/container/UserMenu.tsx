import { useState, useCallback, useContext, useMemo, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { UserContext, type User } from "../context";
import { useApi } from "../hook";
import { FloatingButton, RegisterTaskModal } from "../view";
import { formatTimestamp, classifyTaskList } from "../helper";
import { WaitingPage, WorkingPage } from "../container";

export const UserMenu = () => {
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

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

  const requestGetTasks = useApi(
    {
      path: `/tasks?sort=deadline&progress=todo&progress=doing`,
      method: "GET",
      headers: { Authorization: `Bearer ${user.token}` },
    },
    ({ taskList }) => {
      const [todoList, doing] = classifyTaskList(taskList);

      setUser({
        ...user,
        state: doing ? "working" : "rest",
        todoList,
        doing,
      } as User);
    },
    () =>
      ToastAndroid.show(
        "Fail to Get Tasks, please retry again",
        ToastAndroid.LONG
      )
  );
  const getTasks = useCallback(() => {
    requestGetTasks();
  }, [requestGetTasks]);
  useEffect(getTasks, [getTasks]);

  const requestRegisterTask = useApi(
    {
      path: `/tasks`,
      method: "POST",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: {
        content,
        deadline: formatTimestamp(Date.parse(deadline) || Date.now()),
      },
    },
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
    () =>
      ToastAndroid.show(
        "Fail to Register Task, please retry again",
        ToastAndroid.LONG
      )
  );
  const registerTask = useCallback(() => {
    setContentErrMsg("");
    setDeadlineErrMsg("");

    if (!content) return setContentErrMsg("content Required");
    if (!Date.parse(deadline)) return setDeadlineErrMsg("deadline Invalid");

    if (deadline < formatTimestamp(Date.now()))
      return setDeadlineErrMsg("deadline Cannot be Past");
    if (deadline > formatTimestamp(Date.now() + 1_000 * 60 * 60 * 24 * 30))
      return setDeadlineErrMsg("Beyond 30 Days are Not Possibe");

    requestRegisterTask();
  }, [content, deadline, requestRegisterTask]);

  const deadlineShortcutList = useMemo(
    () =>
      [
        {
          label: "today",
          timestamp: Date.now(),
        },
        {
          label: "next_week",
          timestamp: Date.now() + 1_000 * 60 * 60 * 24 * 7,
        },
        {
          label: "next_month",
          timestamp: Date.now() + 1_000 * 60 * 60 * 24 * 30,
        },
      ].map((shortcut) => ({
        ...shortcut,
        onSelect() {
          setDeadline(formatTimestamp(shortcut.timestamp));
        },
      })),
    []
  );

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
        onUpdateDeadline={setDeadline}
        deadlineErrMsg={deadlineErrMsg}
        shortcutList={deadlineShortcutList}
      />
    </>
  );
};
