import { useState, useContext, useCallback, useRef } from "react";
import { type TextInput, ToastAndroid } from "react-native";
import { LoadingContext, UserContext } from "../../contexts";
import { timestamp2string } from "../helper";
import { taskService } from "../../services";
import { StartTaskModal } from "../views/StartTaskModal";
import { TodoList, type TodoListProps } from "../views/TodoList";
import { TodoListItem } from "../views/TodoListItem";

export const WaitingPage = () => {
  const { startLoading, finishLoading } = useContext(LoadingContext);
  const { user, setUser } = useContext(UserContext);
  if (!user) throw Error("unreachable case");
  const { todoList } = user;

  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");
  const selectTarget = useCallback(
    (index: number) => {
      setTargetIndex(index);
      setInput(todoList[index].content);
    },
    [todoList]
  );
  const unselectTarget = useCallback(() => {
    setTargetIndex(null);
    setInput("");
  }, []);

  const todayString = timestamp2string(Date.now());
  const renderItem = useCallback<TodoListProps["renderItem"]>(
    ({ item: todo, index }) =>
      TodoListItem({
        todo,
        status: todayString > todo.deadline ? "overdue" : "leisurely",
        onClick() {
          selectTarget(index);
        },
      }),
    [todayString, selectTarget]
  );

  const startTask = useCallback(() => {
    if (targetIndex === null) throw Error("unreachable case");

    startLoading();
    setTargetIndex(null);
    taskService
      .start(user, todoList[targetIndex])
      .then((doing) => {
        todoList.splice(targetIndex, 1); // cannot use toSpliced
        setUser({
          ...user,
          todoList: [...todoList],
          doing,
        });
        unselectTarget();
      })
      .catch((_err) => {
        setTargetIndex(targetIndex);

        ToastAndroid.show(
          "Fail to Start Task, please retry again",
          ToastAndroid.LONG
        );
      })
      .finally(finishLoading);
  }, [
    user,
    todoList,
    setUser,
    startLoading,
    finishLoading,
    unselectTarget,
    targetIndex,
  ]);

  const contentModalInputRef = useRef<TextInput>(null);
  const saveContent = useCallback(() => {
    if (targetIndex === null) throw Error("unreachable case");
    const newTodo = { ...todoList[targetIndex], content: input };

    contentModalInputRef.current?.blur();

    startLoading();
    setTargetIndex(null);
    taskService
      .update(user, newTodo)
      .then(({ content }) => {
        todoList[targetIndex].content = content;
        setUser({ ...user, todoList: [...todoList] });
      })
      .catch((_err) => {
        setTargetIndex(targetIndex);

        ToastAndroid.show(
          "Fail to Save Content, please retry again",
          ToastAndroid.LONG
        );
      })
      .finally(finishLoading);
  }, [
    startLoading,
    finishLoading,
    user,
    setUser,
    input,
    todoList,
    targetIndex,
  ]);

  return (
    <>
      <TodoList todoList={user.todoList} renderItem={renderItem} />

      {targetIndex !== null && (
        <StartTaskModal
          visible={targetIndex !== null}
          submitTitle={
            input === todoList[targetIndex].content
              ? "Start Task"
              : "Save Content"
          }
          onSubmit={
            input === todoList[targetIndex].content ? startTask : saveContent
          }
          onCancel={unselectTarget}
          todo={user.todoList[targetIndex]}
          input={input}
          onUpdateInput={setInput}
          inputRef={contentModalInputRef}
        />
      )}
    </>
  );
};
