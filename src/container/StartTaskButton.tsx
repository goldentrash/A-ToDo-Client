import { useState, type ReactNode } from "react";
import { StyleSheet, Modal, View, Button, Text, TextInput } from "react-native";
import type { GenCallApi } from "../types/api";

type FloatingButtonLayoutProps = {
  children?: ReactNode;
  genCallApiThenFetchTodoList: GenCallApi;
};
export const FloatingButtonLayout = ({
  children,
  genCallApiThenFetchTodoList,
}: FloatingButtonLayoutProps) => {
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const openAddTodoModal = () => setAddTodoModalVisible(true);
  const closeAddTodoModal = () => setAddTodoModalVisible(false);

  return (
    <>
      {children}

      <View style={styles.floatingButtonContainer}>
        <Button title="add todo" onPress={openAddTodoModal} />
      </View>

      {addTodoModalVisible && (
        <AddTodoModal
          onRequestClose={closeAddTodoModal}
          genCallApiThenFetchTodoList={genCallApiThenFetchTodoList}
        />
      )}
    </>
  );
};

type AddTodoModalProps = {
  genCallApiThenFetchTodoList: GenCallApi;
  onRequestClose: () => void;
};
function AddTodoModal({
  genCallApiThenFetchTodoList,
  onRequestClose,
}: AddTodoModalProps) {
  const [content, setContent] = useState("");
  const [contentErrMsg, setContentErrMsg] = useState("content required");
  const updateContent = (text: string) => {
    text ? setContentErrMsg("") : setContentErrMsg("content required");

    setContent(text);
  };

  const [deadline, setDeadline] = useState("");
  const [deadlineErrMsg, setDeadlineErrMsg] = useState("");
  const deadlineLimit = Date.now() + 1_000 * 60 * 60 * 24 * 30;
  const updateDeadline = (text: string) => {
    setDeadline(text);

    if (text === "") return setDeadlineErrMsg("");

    const timestamp = Date.parse(text);
    if (timestamp < Date.now()) return setDeadlineErrMsg("cannot be past");
    if (timestamp > deadlineLimit)
      return setDeadlineErrMsg("beyond 30 days are not possibe");

    timestamp
      ? setDeadlineErrMsg("")
      : setDeadlineErrMsg("invalid date format");
  };

  const dateObj = new Date(deadline || deadlineLimit);
  const deadlineString = `
    ${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}
  `.trim();
  const addToDoThenFetchTodoList = genCallApiThenFetchTodoList(
    {
      path: "/todos",
      method: "POST",
      body: { content, deadline: deadlineString },
    },
    onRequestClose
  );

  return (
    <Modal onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Add Todo</Text>

          <View style={styles.modalInputContainer}>
            <View>
              <TextInput
                placeholder="content"
                value={content}
                onChangeText={updateContent}
                maxLength={100}
                multiline
                style={[
                  styles.modalInput,
                  contentErrMsg !== "" && styles.modalInputContainerError,
                ]}
              />
              {contentErrMsg && (
                <Text style={styles.modalErrorMessage}>{contentErrMsg}</Text>
              )}
            </View>

            <View>
              <TextInput
                placeholder={`deadline (by default, ${deadlineString})`}
                value={deadline}
                onChangeText={updateDeadline}
                maxLength={10}
                style={[
                  styles.modalInput,
                  deadlineErrMsg !== "" && styles.modalInputContainerError,
                ]}
              />
              {deadlineErrMsg && (
                <Text style={styles.modalErrorMessage}>{deadlineErrMsg}</Text>
              )}
            </View>
          </View>

          <Button
            onPress={addToDoThenFetchTodoList}
            title="add todo"
            disabled={contentErrMsg !== "" || deadlineErrMsg !== ""}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    bottom: 60,
    position: "absolute",
    right: 42,
  },
  modalBackground: {
    alignItems: "center",
    backgroundColor: "#ecf0f180",
    flex: 1,
    justifyContent: "center",
  },
  modalErrorMessage: {
    color: "#ff0000",
    fontSize: 12,
  },
  modalForeground: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    height: 380,
    padding: 32,
    width: "80%",
  },
  modalInput: {
    borderRadius: 4,
    borderWidth: 1,
    maxHeight: 100,
    padding: 6,
  },
  modalInputContainer: {
    borderTopWidth: 1,
    gap: 8,
    height: 220,
    paddingVertical: 16,
  },
  modalInputContainerError: {
    borderColor: "#ff0000",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
