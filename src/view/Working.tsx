import { type RefObject } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { type Doing } from "../context";

export type WorkingProps = {
  submitTitle: string;
  onSubmit: () => void;
  doing: Doing;
  memo: Doing["memo"];
  onUpdateMemo: React.Dispatch<React.SetStateAction<Doing["memo"]>>;
  memoInputRef: RefObject<TextInput>;
};
export const Working = ({
  submitTitle,
  onSubmit,
  doing: { content, deadline },
  memo,
  onUpdateMemo,
  memoInputRef,
}: WorkingProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <ScrollView>
          <Text style={styles.textContent}>{content}</Text>
        </ScrollView>
        <Text style={styles.textDeadline}>{`by ${deadline}`}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputMemo}
          ref={memoInputRef}
          placeholder="memo"
          value={memo}
          onChangeText={onUpdateMemo}
          maxLength={200}
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
  inputContainer: {
    height: "50%",
    paddingVertical: 16,
  },
  inputMemo: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 6,
  },
  textContainer: {
    borderBottomWidth: 1,
    gap: 8,
    maxHeight: 130,
    paddingVertical: 16,
  },
  textContent: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textDeadline: {
    fontSize: 12,
    textAlign: "right",
  },
});
