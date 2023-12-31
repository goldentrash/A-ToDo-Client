import { useState, useCallback, useContext, useRef } from "react";
import { type TextInput, ToastAndroid } from "react-native";
import { LoadingContext, UserContext } from "../../contexts";
import { taskService } from "../../services";
import { timestamp2string } from "../helper";
import { FinishTaskModal } from "../views/FinishTaskModal";
import { Working } from "../views/Working";

export const WorkingPage = () => {
  const { startLoading, finishLoading } = useContext(LoadingContext);
  const { user, setUser } = useContext(UserContext);
  if (!user?.doing) throw Error("something went wrong");
  const { doing } = user;

  const [input, setInput] = useState(doing.content);
  const inputRef = useRef<TextInput>(null);

  const saveContent = useCallback(() => {
    const newDoing = { ...doing, content: input };

    inputRef.current?.blur();

    startLoading();
    taskService
      .update(user, newDoing)
      .then((doing) => setUser({ ...user, doing }))
      .catch((_err) =>
        ToastAndroid.show(
          "Fail to Save Content, please retry again",
          ToastAndroid.LONG
        )
      )
      .finally(finishLoading);
  }, [startLoading, finishLoading, user, setUser, doing, input]);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const finishDoing = useCallback(() => {
    startLoading();
    setModalVisible(false);
    taskService
      .finish(user, doing)
      .then(() => {
        setUser({ ...user, doing: null });
        closeModal();
      })
      .catch((_err) => {
        setModalVisible(true);

        ToastAndroid.show(
          "Fail to Finish Task, please retry again",
          ToastAndroid.LONG
        );
      })
      .finally(finishLoading);
  }, [startLoading, finishLoading, user, setUser, closeModal, doing]);

  const todayString = timestamp2string(Date.now());
  return (
    <>
      <Working
        submitTitle={input === doing.content ? "Finish Task" : "Save Content"}
        onSubmit={input === doing.content ? openModal : saveContent}
        task={doing}
        input={input}
        onUpdateInput={setInput}
        inputRef={inputRef}
        status={todayString > doing.deadline ? "overdue" : "leisurely"}
      />
      <FinishTaskModal
        visible={modalVisible}
        onSubmit={finishDoing}
        onCancel={closeModal}
        doing={doing}
      />
    </>
  );
};
