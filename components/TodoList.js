import { useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

const TodoList = ({ todoList, genCallApiThenFetchTodoListAndDoing }) => {
  const [startTodoModalVisible, setStartTodoModalVisible] = useState(false);
  const openStartTodoModal = () => setStartTodoModalVisible(true);
  const closeStartTodoModal = () => setStartTodoModalVisible(false);

  const [watchingTodo, setWatchingTodo] = useState(null);
  const renderTodo = ({ item: todo }) => {
    const { content, deadline } = todo;
    const watchTodo = () => {
      setWatchingTodo(todo);
      openStartTodoModal();
    };

    return (
      <Pressable style={styles.listItem} onPress={watchTodo}>
        <Text style={styles.listItemTextContent}>{content}</Text>
        <Text
          style={styles.listItemTextDeadline}
        >{`by ${deadline.toString()}`}</Text>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        style={styles.listContainer}
        data={todoList}
        renderItem={renderTodo}
      />

      {startTodoModalVisible && (
        <StartTodoModal
          genCallApiThenFetchTodoListAndDoing={
            genCallApiThenFetchTodoListAndDoing
          }
          onRequestClose={closeStartTodoModal}
          watchingTodo={watchingTodo}
        />
      )}
    </>
  );
};

const StartTodoModal = ({
  genCallApiThenFetchTodoListAndDoing,
  onRequestClose,
  watchingTodo: { id, content, deadline },
}) => {
  const startTodoThenFetchTodoList = genCallApiThenFetchTodoListAndDoing(
    { path: '/doings', method: 'POST', body: { id } },
    onRequestClose
  );

  return (
    <Modal onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Start Todo</Text>

          <ScrollView style={styles.modalTextContainer}>
            <Text style={styles.modalTextContent}>{content}</Text>
            <Text style={styles.modalTextDeadline}>
              {`by ${deadline.toString()}`}
            </Text>
          </ScrollView>

          <Button onPress={startTodoThenFetchTodoList} title="start todo" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f180',
  },
  modalForeground: {
    backgroundColor: '#ffffff',
    width: '80%',
    height: 380,
    gap: 12,
    padding: 32,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTextContainer: {
    gap: 8,
    borderTopWidth: 1,
    height: 220,
    paddingVertical: 16,
  },
  modalTextContent: {
    fontSize: 16,
  },
  modalTextDeadline: {
    fontSize: 12,
    textAlign: 'right',
  },
  listContainer: {
    flex: 1,
    marginTop: 64,
    width: '80%',
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    margin: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  listItemTextContent: {
    fontSize: 16,
  },
  listItemTextDeadline: {
    fontSize: 12,
    textAlign: 'right',
  },
});

export default TodoList;
