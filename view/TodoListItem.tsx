import { Pressable, Text, StyleSheet } from "react-native";
import { type TaskVO } from "../service";
import {
  COLOR_BLACK,
  COLOR_WARNING,
  FONT_SIZE_HINT,
  FONT_SIZE_NORMAL,
} from "../constant";

export type TodoListItemProps = {
  todo: TaskVO;
  status: "overdue" | "leisurely";
  onClick(): void;
};
export const TodoListItem = ({
  todo: { content, deadline },
  status,
  onClick,
}: TodoListItemProps) => {
  return (
    <Pressable
      style={[
        styles.itemContainer,
        status === "overdue" && styles.itemOverdued,
      ]}
      onPress={onClick}
    >
      <Text style={styles.itemTextContent}>{content}</Text>
      <Text style={styles.itemTextDeadline}>{`by ${deadline}`}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: COLOR_BLACK,
    borderRadius: 6,
    borderWidth: 1,
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  itemOverdued: {
    backgroundColor: COLOR_WARNING,
  },
  itemTextContent: {
    fontSize: FONT_SIZE_NORMAL,
  },
  itemTextDeadline: {
    fontSize: FONT_SIZE_HINT,
    textAlign: "right",
  },
});
