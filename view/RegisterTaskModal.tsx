import {
  StyleSheet,
  Modal,
  View,
  Button,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import {
  COLOR_BACKGROUND,
  COLOR_ERROR,
  COLOR_LINK,
  COLOR_SHADOWED,
  FONT_SIZE_HINT,
  FONT_SIZE_TITLE,
  LIMIT_CONTENT_CHAR,
} from "../constant";

type Shortcut = {
  label: string;
  onSelect(): void;
};

export type RegisterTaskModalProps = {
  visible: boolean;
  onSubmit(): void;
  onCancel(): void;
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
                maxLength={LIMIT_CONTENT_CHAR}
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
    backgroundColor: COLOR_SHADOWED,
    flex: 1,
    justifyContent: "center",
  },
  modalErrorMessage: {
    color: COLOR_ERROR,
    fontSize: FONT_SIZE_HINT,
  },
  modalForeground: {
    backgroundColor: COLOR_BACKGROUND,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    minHeight: 380,
    padding: 32,
    width: "80%",
  },
  modalInput: {
    borderRadius: 4,
    borderWidth: 1,
    maxHeight: 180,
    padding: 6,
  },
  modalInputContainer: {
    borderTopWidth: 1,
    gap: 8,
    minHeight: 220,
    paddingVertical: 16,
  },
  modalInputContainerError: {
    borderColor: COLOR_ERROR,
  },
  modalShortcutBox: {
    flexDirection: "row",
    gap: 14,
    justifyContent: "flex-end",
    margin: 2,
  },
  modalShortcutItem: {
    color: COLOR_LINK,
  },
  modalShortcutItemError: {
    borderBottomColor: COLOR_ERROR,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: "bold",
  },
});
