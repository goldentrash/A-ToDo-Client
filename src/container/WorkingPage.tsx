import { useState, useCallback, useContext, useRef, useMemo } from "react";
import { type TextInput, ToastAndroid } from "react-native";
import { UserContext } from "../context";
import {
  useApi,
  type RequestOption,
  type RseponseHandler,
  type ErrorHandler,
} from "../hook";
import { FinishTaskModal, Working } from "../view";

export const WorkingPage = () => {
  const { user, setUser } = useContext(UserContext);
  if (user?.state !== "working") throw Error("something went wrong");

  const [memo, setMemo] = useState(user.doing.memo);
  const memoInputRef = useRef<TextInput>(null);

  const saveMemoReqOpt = useMemo<RequestOption>(
    () => ({
      path: `/tasks/${user.doing.id}/memo`,
      method: "PUT",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: { memo },
    }),
    [user, memo]
  );
  const saveMemoResHandler = useCallback<RseponseHandler>(
    ({ task: { memo } }) =>
      setUser({ ...user, doing: { ...user.doing, memo } }),
    [user, setUser]
  );
  const saveMemoErrHandler = useCallback<ErrorHandler>(
    () =>
      ToastAndroid.show(
        "Fail to Save Memo, please retry again",
        ToastAndroid.LONG
      ),
    []
  );
  const saveMemoReq = useApi(
    saveMemoReqOpt,
    saveMemoResHandler,
    saveMemoErrHandler
  );
  const saveMemo = useCallback(() => {
    saveMemoReq();
    memoInputRef.current?.blur();
  }, [saveMemoReq]);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const finishTaskReqOpt = useMemo<RequestOption>(
    () => ({
      path: `/tasks/${user.doing.id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: { action: "finish" },
    }),
    [user]
  );
  const finishTaskResHandler = useCallback<RseponseHandler>(() => {
    setUser({ ...user, state: "rest" });
    closeModal();
  }, [user, setUser, closeModal]);
  const finishTaskErrHandler = useCallback<ErrorHandler>(
    () =>
      ToastAndroid.show(
        "Fail to Finish Task, please retry again",
        ToastAndroid.LONG
      ),
    []
  );
  const finishTaskReq = useApi(
    finishTaskReqOpt,
    finishTaskResHandler,
    finishTaskErrHandler
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
        onSubmit={finishTaskReq}
        onCancel={closeModal}
        doing={user.doing}
      />
    </>
  );
};
