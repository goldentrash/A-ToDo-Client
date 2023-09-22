import { Button, Modal, View, Text, TextInput, StyleSheet } from "react-native";
import {
  COLOR_BACKGROUND,
  COLOR_ERROR,
  COLOR_SHADOWED,
  FONT_SIZE_HINT,
  FONT_SIZE_TITLE,
  LIMIT_PASSWORD_CHAR,
  LIMIT_USER_ID_CHAR,
} from "../constant";

export type SignUpModalProps = {
  visible: boolean;
  onSubmit(): void;
  onCancel(): void;
  id: string;
  onUpdateId: React.Dispatch<React.SetStateAction<string>>;
  idErrMsg: string;
  password: string;
  onUpdatePassword: React.Dispatch<React.SetStateAction<string>>;
  passwordErrMsg: string;
};
export const SignUpModal = ({
  visible,
  onSubmit,
  onCancel,
  id,
  onUpdateId,
  idErrMsg,
  password,
  onUpdatePassword,
  passwordErrMsg,
}: SignUpModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Sign Up</Text>

          <View style={styles.modalInputContainer}>
            <View>
              <TextInput
                placeholder="ID"
                value={id}
                onChangeText={onUpdateId}
                maxLength={LIMIT_USER_ID_CHAR}
                style={[
                  styles.modalInput,
                  idErrMsg !== "" && styles.modalInputContainerError,
                ]}
              />
              {idErrMsg && (
                <Text style={styles.modalErrorMessage}>{idErrMsg}</Text>
              )}
            </View>

            <View>
              <TextInput
                placeholder="password"
                value={password}
                onChangeText={onUpdatePassword}
                maxLength={LIMIT_PASSWORD_CHAR}
                style={[
                  styles.modalInput,
                  passwordErrMsg !== "" && styles.modalInputContainerError,
                ]}
              />
              {passwordErrMsg && (
                <Text style={styles.modalErrorMessage}>{passwordErrMsg}</Text>
              )}
            </View>
          </View>

          <Button onPress={onSubmit} title="Sign Up" />
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
    height: 380,
    padding: 32,
    width: "80%",
  },
  modalInput: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 6,
  },
  modalInputContainer: {
    borderTopWidth: 1,
    gap: 8,
    height: 220,
    paddingVertical: 16,
  },
  modalInputContainerError: {
    borderColor: COLOR_ERROR,
  },
  modalTitle: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: "bold",
  },
});
