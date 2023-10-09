import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import { type TaskVO } from "../../services";
import {
  COLOR_WARNING,
  FONT_SIZE_HINT,
  FONT_SIZE_TITLE,
  LIMIT_CONTENT_CHAR,
} from "../../constants";

export type WorkingProps = {
  submitTitle: string;
  onSubmit(): void;
  task: TaskVO;
  input: string;
  onUpdateInput: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<TextInput>;
  status: "overdue" | "leisurely";
};
export const Working = ({
  submitTitle,
  onSubmit,
  task: { deadline },
  input,
  onUpdateInput,
  inputRef,
  status,
}: WorkingProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Working</Text>
        <Text style={styles.textDeadline}>{`by ${deadline}`}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, status === "overdue" && styles.taskOverdued]}
          ref={inputRef}
          value={input}
          onChangeText={onUpdateInput}
          maxLength={LIMIT_CONTENT_CHAR}
          multiline
        />
      </View>

      <Button onPress={onSubmit} title={submitTitle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 6,
  },
  inputContainer: {
    height: "50%",
    paddingVertical: 16,
  },
  taskOverdued: {
    backgroundColor: COLOR_WARNING,
  },
  textContainer: {
    borderBottomWidth: 1,
    gap: 8,
    maxHeight: 130,
    paddingVertical: 16,
  },
  textDeadline: {
    fontSize: FONT_SIZE_HINT,
    textAlign: "right",
  },
  textTitle: {
    fontSize: FONT_SIZE_TITLE,
    fontWeight: "bold",
  },
});
