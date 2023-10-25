import { useState, useContext, useCallback, useMemo } from "react";
import { ToastAndroid } from "react-native";
import { UserContext } from "../context";
import { useApi } from "../hook";
import {
  StartTaskModal,
  TodoList,
  TodoListItem,
  type TodoListProps,
} from "../view";
import { formatTimestamp } from "../helper";

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

  const todayString = useMemo(() => formatTimestamp(Date.now()), []);
  const renderItem = useCallback<TodoListProps["renderItem"]>(
    ({ item: todo, index }) =>
      TodoListItem({
        todo,
        status: todayString > todo.deadline ? "overdue" : "leisurely",
        onClick: () => openModal(index),
      }),
    [openModal, todayString]
  );

  const requestStartTask = useApi(
    {
      path: `/tasks/${user.todoList[selectedTaskIndex]?.id}`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${user?.token}` },
      body: { action: "start" },
    },
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
    (_err) =>
      ToastAndroid.show(
        "Fail to Start Task, please retry again",
        ToastAndroid.LONG
      )
  );

  return (
    <>
      <TodoList todoList={user.todoList} renderItem={renderItem} />

      <StartTaskModal
        visible={modalVisible}
        onSubmit={requestStartTask}
        onCancel={closeModal}
        todo={user.todoList[selectedTaskIndex]}
      />
    </>
  );
};
