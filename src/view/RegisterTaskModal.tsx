import {
  StyleSheet,
  Modal,
  View,
  Button,
  Text,
  TextInput,
  Pressable,
} from "react-native";

type Shortcut = {
  label: string;
  onSelect(): void;
};

export type RegisterTaskModalProps = {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  content: string;
  onUpdateContent: React.Dispatch<React.SetStateAction<string>>;
  contentErrMsg: string;
  deadline: string;
  onUpdateDeadline: React.Dispatch<React.SetStateAction<string>>;
  deadlineErrMsg: string;
  shortcutList: Shortcut[];
};
export const RegisterTaskModal = ({
  visible,
  onSubmit,
  onCancel,
  content,
  onUpdateContent,
  contentErrMsg,
  deadline,
  onUpdateDeadline,
  deadlineErrMsg,
  shortcutList,
}: RegisterTaskModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Register Task</Text>

          <View style={styles.modalInputContainer}>
            <View>
              <TextInput
                placeholder="content"
                value={content}
                onChangeText={onUpdateContent}
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
                placeholder="deadline"
                value={deadline}
                onChangeText={onUpdateDeadline}
                maxLength={10}
                style={[
                  styles.modalInput,
                  deadlineErrMsg !== "" && styles.modalInputContainerError,
                ]}
              />
              <View style={styles.modalShortcutBox}>
                {shortcutList.map(({ label, onSelect }, index) => (
                  <Pressable key={index} onPress={onSelect}>
                    <Text
                      style={[
                        styles.modalShortcutItem,
                        deadlineErrMsg !== "" && styles.modalShortcutItemError,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {deadlineErrMsg && (
                <Text style={styles.modalErrorMessage}>{deadlineErrMsg}</Text>
              )}
            </View>
          </View>

          <Button onPress={onSubmit} title="Register Task" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    maxHeight: 140,
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
  modalShortcutBox: {
    flexDirection: "row",
    gap: 14,
    justifyContent: "flex-end",
    margin: 2,
  },
  modalShortcutItem: {
    color: "#0000EE",
  },
  modalShortcutItemError: {
    borderBottomColor: "#ff0000",
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
