import {
  FlatList,
  type ListRenderItem,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { type Todo } from "../context";

export type TodoListProps = {
  todoList: Todo[];
  renderItem: ListRenderItem<Todo>;
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
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 16,
  },
});
