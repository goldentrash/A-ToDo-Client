import { useState } from 'react';
import { StyleSheet, Modal, View, Button, Text, TextInput } from 'react-native';

export default FloatingButtonLayout = ({
  children,
  callAPI,
  fetchTodoList,
}) => {
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const openAddTodoModal = () => setAddTodoModalVisible(true);
  const closeAddTodoModal = () => setAddTodoModalVisible(false);

  return (
    <>
      {children}

      <View style={styles.floatingButtonContainer}>
        <Button title="add todo" onPress={openAddTodoModal} />
      </View>

      {addTodoModalVisible && (
        <AddTodoModal
          callAPI={callAPI}
          onRequestClose={closeAddTodoModal}
          fetchTodoList={fetchTodoList}
        />
      )}
    </>
  );
};

const AddTodoModal = ({ callAPI, onRequestClose, fetchTodoList }) => {
  const [content, setContent] = useState('');
  const [contentErrMsg, setContentErrMsg] = useState('content required');
  const updateContent = (text) => {
    text ? setContentErrMsg('') : setContentErrMsg('content required');

    setContent(text);
  };

  const [deadline, setDeadline] = useState('');
  const [deadlineErrMsg, setDeadlineErrMsg] = useState('invalid date format');
  const updateDeadline = (text) => {
    const timestamp = Date.parse(text);
    timestamp
      ? setDeadlineErrMsg('')
      : setDeadlineErrMsg('invalid date format');

    if (timestamp < Date.now()) setDeadlineErrMsg('cannot be past');
    if (timestamp > Date.now() + 1_000 * 60 * 60 * 24 * 30)
      setDeadlineErrMsg('beyond 30 days are not possibe');

    setDeadline(text);
  };

  const addToDo = callAPI(
    { path: '/todos', method: 'POST', body: { content, deadline } },
    ({ message }) => {
      fetchTodoList();
      onRequestClose();
    }
  );

  return (
    <Modal onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Add Todo</Text>

          <View style={styles.modalInputContainer}>
            <View>
              <TextInput
                placeholder="content"
                value={content}
                onChangeText={updateContent}
                maxLength={100}
                multiline
                style={[
                  styles.modalInput,
                  contentErrMsg && styles.modalInputContainerError,
                ]}
              />
              {contentErrMsg && (
                <Text style={styles.modalErrorMessage}>{contentErrMsg}</Text>
              )}
            </View>

            <View>
              <View style={styles.deadlineContainer}>
                <TextInput
                  placeholder="deadline (yyyy-mm-dd)"
                  value={deadline}
                  onChangeText={updateDeadline}
                  maxLength={10}
                  style={[
                    styles.modalInput,
                    deadlineErrMsg && styles.modalInputContainerError,
                  ]}
                />
              </View>

              {deadlineErrMsg && (
                <Text style={styles.modalErrorMessage}>{deadlineErrMsg}</Text>
              )}
            </View>
          </View>

          <Button
            onPress={addToDo}
            title="add todo"
            disabled={contentErrMsg !== '' || deadlineErrMsg !== ''}
          />
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
  modalInputContainer: {
    gap: 8,
    borderTopWidth: 1,
    height: 220,
    paddingVertical: 16,
  },
  modalInputContainerError: {
    borderColor: '#ff0000',
  },
  modalErrorMessage: {
    fontSize: 12,
    color: '#ff0000',
  },
  modalInput: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 100,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 60,
    right: 42,
  },
});
