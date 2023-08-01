import {
  Button,
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { type Doing } from "../context";

export type FinishTaskModalProps = {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  doing: Doing;
};
export const FinishTaskModal = ({
  visible,
  onSubmit,
  onCancel,
  doing,
}: FinishTaskModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Finish Task</Text>

          <ScrollView style={styles.modalTextContainer}>
            <Text style={styles.modalTextContent}>{doing.content}</Text>
          </ScrollView>

          <Button onPress={onSubmit} title="Finish Task" />
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
  modalForeground: {
    backgroundColor: "#ffffff",
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
    height: 230,
    paddingVertical: 16,
  },
  modalTextContent: {
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
