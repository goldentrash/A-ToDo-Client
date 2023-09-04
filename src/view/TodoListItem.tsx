import { Pressable, Text, StyleSheet } from "react-native";
import { type Task } from "../context";

export type TodoListItemProps = {
  todo: Task;
  status: "overdue" | "leisurely";
  onClick: () => void;
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
    borderColor: "black",
    borderRadius: 6,
    borderWidth: 1,
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  itemOverdued: {
    backgroundColor: "#FFB6C1",
  },
  itemTextContent: {
    fontSize: 16,
  },
  itemTextDeadline: {
    fontSize: 12,
    textAlign: "right",
  },
});
