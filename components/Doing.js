import { useState } from 'react';
import { Button, Modal, View, Text, TextInput, StyleSheet } from 'react-native';

const Doing = ({ doing, callApiThenFetchTodoListAndDoing }) => {
  const [finishDoingModalVisible, setFinishDoingModalVisible] = useState(false);
  const openFinishDoingModal = () => setFinishDoingModalVisible(true);
  const closeFinishDoingModal = () => setFinishDoingModalVisible(false);

  const [memo, setMemo] = useState('');

  const { content, deadline } = doing;

  return (
    <>
      <View style={styles.viewerContainer}>
        <View style={styles.viewerTextContainer}>
          <Text style={styles.viewerTextContent}>{content}</Text>
          <Text style={styles.viewerTextDeadline}>{deadline}</Text>
        </View>

        <View style={styles.viewerInputContainer}>
          <TextInput
            style={styles.viewerInputMemo}
            placeholder="memo"
            value={memo}
            onChangeText={setMemo}
            maxLength={200}
            multiline
          />
        </View>

        <Button onPress={openFinishDoingModal} title="finish doing" />
      </View>

      {finishDoingModalVisible && (
        <FinishDoingModal
          callApiThenFetchTodoListAndDoing={callApiThenFetchTodoListAndDoing}
          onRequestClose={closeFinishDoingModal}
          doing={doing}
          memo={memo}
        />
      )}
    </>
  );
};

const FinishDoingModal = ({
  callApiThenFetchTodoListAndDoing,
  onRequestClose,
  doing: { id },
  memo,
}) => {
  const finishDoingThenFetchTodoListAndDoing = callApiThenFetchTodoListAndDoing(
    {
      path: '/dones',
      method: 'POST',
      body: { id, memo },
    },
    onRequestClose
  );

  return (
    <Modal onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Finish Doing</Text>

          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTextMemo}>{memo}</Text>
          </View>

          <Button
            onPress={finishDoingThenFetchTodoListAndDoing}
            title="finish doing"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewerContainer: {
    flex: 1,
    marginTop: 64,
    width: '80%',
  },
  viewerTextContainer: {
    gap: 8,
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  viewerTextContent: {
    maxHeight: 100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewerTextDeadline: {
    fontSize: 12,
    textAlign: 'right',
  },
  viewerInputContainer: {
    paddingVertical: 16,
    height: '50%',
  },
  viewerInputMemo: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 4,
  },
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
  modalTextMemo: {
    fontSize: 16,
  },
});

export default Doing;
