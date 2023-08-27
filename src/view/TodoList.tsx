import {
  FlatList,
  type ListRenderItem,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { type Task } from "../context";

export type TodoListProps = {
  todoList: Task[];
  renderItem: ListRenderItem<Task>;
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
