import {
  Button,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { type Todo } from "../context";

export type StartTaskModalProps = {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  todo: Todo | null;
};
export const StartTaskModal = ({
  visible,
  onSubmit,
  onCancel,
  todo,
}: StartTaskModalProps) => {
  if (!todo) return <></>;
  const { content, deadline } = todo;

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Start Task</Text>

          <View style={styles.modalTextContainer}>
            <ScrollView>
              <Text style={styles.modalTextContent}>{content}</Text>
            </ScrollView>
            <Text style={styles.modalTextDeadline}>{`by ${deadline}`}</Text>
          </View>

          <Button onPress={onSubmit} title="Start Task" />
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
  modalTextDeadline: {
    fontSize: 12,
    textAlign: "right",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
