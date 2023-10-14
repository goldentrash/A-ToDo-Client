import {
  Button,
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { type TaskVO } from "../../services";
import {
  COLOR_BACKGROUND,
  COLOR_SHADOWED,
  FONT_SIZE_NORMAL,
  FONT_SIZE_TITLE,
} from "../../constants";

export type FinishTaskModalProps = {
  visible: boolean;
  onSubmit(): void;
  onCancel(): void;
  doing: TaskVO;
};
export const FinishTaskModal = ({
  visible,
  onSubmit,
  onCancel,
  doing: { content },
}: FinishTaskModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Finish Task</Text>

          <View style={styles.modalTextContainer}>
            <ScrollView style={styles.modalContentContainer}>
              <Text style={styles.modalTextContent}>{content}</Text>
            </ScrollView>
          </View>

          <Button onPress={onSubmit} title="Finish Task" />
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
  modalContentContainer: {
    borderRadius: 4,
    borderWidth: 1,
    height: 230,
    padding: 6,
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
  modalTextContainer: {
    borderTopWidth: 1,
    gap: 8,
    paddingTop: 16,
  },
  modalTextContent: {
    fontSize: FONT_SIZE_NORMAL,
  },
  modalTitle: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: "bold",
  },
});
