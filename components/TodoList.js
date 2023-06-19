import { FlatList, Text, StyleSheet, View } from 'react-native';

const TodoList = ({ todoList }) => {
  const renderTodo = ({ item: todo }) => {
    const { content, deadline } = todo;

    return (
      <View style={styles.listItem}>
        <Text>{content}</Text>
        <Text style={styles.deadlineText}>{deadline.toString()}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={todoList}
      renderItem={renderTodo}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    width: '80%',
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    margin: 8,
    padding: 4,
  },
  deadlineText: {
    fontSize: 12,
    textAlign: 'right',
  },
});

export default TodoList;
