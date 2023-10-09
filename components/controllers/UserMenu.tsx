import { useState, useCallback, useContext } from "react";
import { ToastAndroid } from "react-native";
import { UserContext, LoadingContext } from "../../contexts";
import { WorkingPage } from "../controllers/WorkingPage";
import { WaitingPage } from "../controllers/WaitingPage";
import { taskService } from "../../services";
import { LIMIT_DEADLINE, SHORTCUT_LIST_DEADLINE } from "../../constants";
import { timestamp2string } from "../helper";
import { RegisterTaskModal } from "../views/RegisterTaskModal";
import { FloatingButton } from "../views/FloatingButton";

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

  const { startLoading, finishLoading } = useContext(LoadingContext);
  const { user, setUser } = useContext(UserContext);
  if (!user) throw Error("unreachable case");

  const registerTask = useCallback(() => {
    setContentErrMsg("");
    setDeadlineErrMsg("");

    if (!content) return setContentErrMsg("content Required");
    if (!Date.parse(deadline)) return setDeadlineErrMsg("deadline Invalid");

    const formattedDeadline = timestamp2string(Date.parse(deadline));
    const formattedDeadlineLimit = timestamp2string(
      Date.now() + LIMIT_DEADLINE.fromNowMS
    );
    if (formattedDeadline > formattedDeadlineLimit)
      return setDeadlineErrMsg(
        `Beyond ${LIMIT_DEADLINE.label} are Not Possibe`
      );

    startLoading();
    taskService
      .register(user, {
        content,
        deadline: formattedDeadline,
      })
      .then((task) => {
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
      })
      .catch((_err) =>
        ToastAndroid.show(
          "Fail to Register Task, please retry again",
          ToastAndroid.LONG
        )
      )
      .finally(finishLoading);
  }, [
    content,
    deadline,
    startLoading,
    finishLoading,
    user,
    setUser,
    closeModal,
  ]);

  const deadlineShortcutList = SHORTCUT_LIST_DEADLINE.map((shortcut) => ({
    ...shortcut,
    onSelect() {
      setDeadline(timestamp2string(Date.now() + shortcut.fromNowMS));
    },
  }));

  return (
    <>
      {user.doing ? <WorkingPage /> : <WaitingPage />}

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
