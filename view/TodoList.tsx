import {
  FlatList,
  type ListRenderItem,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { type TaskVO } from "../service";
import { FONT_SIZE_TITLE } from "../constant";

export type TodoListProps = {
  todoList: TaskVO[];
  renderItem: ListRenderItem<TaskVO>;
};
export const TodoList = ({ todoList, renderItem }: TodoListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <FlatList data={todoList} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    maxHeight: "95%",
    width: "80%",
  },
  title: {
    borderBottomWidth: 1,
    fontSize: FONT_SIZE_TITLE,
    fontWeight: "bold",
    paddingBottom: 16,
  },
});
