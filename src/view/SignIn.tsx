import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

export type SignInProps = {
  onSubmit: () => void;
  openSignUpModal: () => void;
  id: string;
  onUpdateId: React.Dispatch<React.SetStateAction<string>>;
  idErrMsg: string;
  password: string;
  onUpdatePassword: React.Dispatch<React.SetStateAction<string>>;
  passwordErrMsg: string;
};
export const SignIn = ({
  onSubmit,
  openSignUpModal,
  id,
  onUpdateId,
  idErrMsg,
  password,
  onUpdatePassword,
  passwordErrMsg,
}: SignInProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            placeholder="ID"
            value={id}
            onChangeText={onUpdateId}
            maxLength={10}
            style={[
              styles.input,
              idErrMsg !== "" && styles.inputContainerError,
            ]}
          />
          {idErrMsg && <Text style={styles.errorMessage}>{idErrMsg}</Text>}
        </View>

        <View>
          <TextInput
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={onUpdatePassword}
            maxLength={15}
            style={[
              styles.input,
              passwordErrMsg !== "" && styles.inputContainerError,
            ]}
          />
          {passwordErrMsg && (
            <Text style={styles.errorMessage}>{passwordErrMsg}</Text>
          )}
        </View>
      </View>

      <Pressable onPress={openSignUpModal}>
        <Text style={styles.link}>Sign Up</Text>
      </Pressable>

      <View style={styles.submitButton}>
        <Button onPress={onSubmit} title="Sign In" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    width: "80%",
  },
  errorMessage: {
    color: "#ff0000",
    fontSize: 12,
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 6,
  },
  inputContainer: {
    gap: 12,
  },
  inputContainerError: {
    borderColor: "#ff0000",
  },
  link: {
    color: "#0000EE",
    textAlign: "right",
  },
  submitButton: {
    marginBottom: "30%",
    marginTop: "auto",
  },
  title: {
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 16,
  },
});
