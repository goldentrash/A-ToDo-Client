import { useState, useCallback, useContext, useRef } from "react";
import { type TextInput, ToastAndroid } from "react-native";
import { UserContext } from "../context";
import { useApi } from "../hook";
import { FinishTaskModal, Working } from "../view";

export const WorkingPage = () => {
  const { user, setUser } = useContext(UserContext);
  if (user?.state !== "working") throw Error("something went wrong");

  const [memo, setMemo] = useState(user.doing.memo);
  const memoInputRef = useRef<TextInput>(null);

  const requestSaveMemo = useApi(
    {
      path: `/tasks/${user.doing.id}/memo`,
      method: "PUT",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: { memo },
    },
    ({ task: { memo } }) =>
      setUser({ ...user, doing: { ...user.doing, memo } }),
    () =>
      ToastAndroid.show(
        "Fail to Save Memo, please retry again",
        ToastAndroid.LONG
      )
  );
  const saveMemo = useCallback(() => {
    requestSaveMemo();
    memoInputRef.current?.blur();
  }, [requestSaveMemo]);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const requestFinishTask = useApi(
    {
      path: `/tasks/${user.doing.id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: { action: "finish" },
    },
    () => {
      setUser({ ...user, state: "rest", doing: null });
      closeModal();
    },
    () =>
      ToastAndroid.show(
        "Fail to Finish Task, please retry again",
        ToastAndroid.LONG
      )
  );

  return (
    <>
      <Working
        submitTitle={memo === user.doing.memo ? "Finish Task" : "Save Memo"}
        onSubmit={memo === user.doing.memo ? openModal : saveMemo}
        doing={user.doing}
        memo={memo}
        onUpdateMemo={setMemo}
        memoInputRef={memoInputRef}
      />
      <FinishTaskModal
        visible={modalVisible}
        onSubmit={requestFinishTask}
        onCancel={closeModal}
        doing={user.doing}
      />
    </>
  );
};
