import { useState, useContext, useCallback, useMemo } from "react";
import { ToastAndroid } from "react-native";
import { UserContext } from "../context";
import {
  useApi,
  type RequestOption,
  type RseponseHandler,
  type ErrorHandler,
} from "../hook";
import {
  StartTaskModal,
  TodoList,
  TodoListItem,
  type TodoListProps,
} from "../view";

export const WaitingPage = () => {
  const { user, setUser } = useContext(UserContext);
  if (!user) throw Error("unreachable case");

  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback((index: number) => {
    setSelectedTaskIndex(index);
    setModalVisible(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const renderItem = useCallback<TodoListProps["renderItem"]>(
    ({ item: todo, index }) =>
      TodoListItem({ todo, onClick: () => openModal(index) }),
    [openModal]
  );

  const startTaskReqOpt = useMemo<RequestOption>(
    () => ({
      path: `/tasks/${user.todoList[selectedTaskIndex]?.id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: { action: "start" },
    }),
    [selectedTaskIndex, user]
  );
  const startTaskResHandler = useCallback<RseponseHandler>(
    ({ task }) => {
      user.todoList.splice(selectedTaskIndex, 1);
      setUser({
        ...user,
        state: "working",
        todoList: [...user.todoList],
        doing: task,
      });
      closeModal();
    },
    [user, selectedTaskIndex, setUser, closeModal]
  );
  const startTaskErrHandler = useCallback<ErrorHandler>(
    () =>
      ToastAndroid.show(
        "Fail to Start Task, please retry again",
        ToastAndroid.LONG
      ),
    []
  );
  const startTaskReq = useApi(
    startTaskReqOpt,
    startTaskResHandler,
    startTaskErrHandler
  );

  return (
    <>
      <TodoList todoList={user.todoList} renderItem={renderItem} />

      <StartTaskModal
        visible={modalVisible}
        onSubmit={startTaskReq}
        onCancel={closeModal}
        todo={user.todoList[selectedTaskIndex]}
      />
    </>
  );
};
