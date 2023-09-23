import { Button, Modal, Text, TextInput, StyleSheet, View } from "react-native";
import { type TaskVO } from "../service";
import {
  COLOR_BACKGROUND,
  COLOR_SHADOWED,
  FONT_SIZE_HINT,
  FONT_SIZE_TITLE,
  LIMIT_CONTENT_CHAR,
} from "../constant";

export type StartTaskModalProps = {
  visible: boolean;
  submitTitle: string;
  onSubmit(): void;
  onCancel(): void;
  todo: TaskVO;
  input: string;
  onUpdateInput: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<TextInput>;
};
export const StartTaskModal = ({
  visible,
  submitTitle,
  onSubmit,
  onCancel,
  todo: { deadline },
  input,
  onUpdateInput,
  inputRef,
}: StartTaskModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Start Task</Text>

          <View style={styles.modalTextContainer}>
            <View>
              <TextInput
                style={styles.modalInput}
                ref={inputRef}
                value={input}
                onChangeText={onUpdateInput}
                maxLength={LIMIT_CONTENT_CHAR}
                multiline
              />
            </View>
            <Text style={styles.modalTextDeadline}>{`by ${deadline}`}</Text>
          </View>

          <Button onPress={onSubmit} title={submitTitle} />
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
  modalForeground: {
    backgroundColor: COLOR_BACKGROUND,
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
    maxHeight: 180,
    padding: 6,
  },
  modalTextContainer: {
    borderTopWidth: 1,
    gap: 8,
    height: 230,
    paddingVertical: 16,
  },
  modalTextDeadline: {
    fontSize: FONT_SIZE_HINT,
    textAlign: "right",
  },
  modalTitle: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: "bold",
  },
});
