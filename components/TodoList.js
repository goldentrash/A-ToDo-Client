import { useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const TodoList = ({ todoList, callApiThenFetchTodoList }) => {
  const [startDoingModalVisible, setStartDoingModalVisible] = useState(false);
  const openStartDoingModal = () => setStartDoingModalVisible(true);
  const closeStartDoingModal = () => setStartDoingModalVisible(false);

  const [watchingTodo, setWatchingTodo] = useState(null);
  const renderTodo = ({ item: todo }) => {
    const { content, deadline } = todo;
    const watchTodo = () => {
      setWatchingTodo(todo);
      openStartDoingModal();
    };

    return (
      <Pressable style={styles.listItem} onPress={watchTodo}>
        <Text style={styles.listItemTextContent}>{content}</Text>
        <Text style={styles.listItemTextDeadline}>{deadline.toString()}</Text>
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

      {startDoingModalVisible && (
        <StartDoingModal
          callApiThenFetchTodoList={callApiThenFetchTodoList}
          onRequestClose={closeStartDoingModal}
          watchingTodo={watchingTodo}
        />
      )}
    </>
  );
};

const StartDoingModal = ({
  callApiThenFetchTodoList,
  onRequestClose,
  watchingTodo: { id, content, deadline },
}) => {
  const startDoingThenFetchTodoList = callApiThenFetchTodoList(
    { path: '/doings', method: 'POST', body: { id } },
    onRequestClose
  );

  return (
    <Modal onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Start Doing</Text>

          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTextContent}>{content}</Text>
            <Text style={styles.modalTextDeadline}>{deadline}</Text>
          </View>

          <Button onPress={startDoingThenFetchTodoList} title="start doing" />
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
