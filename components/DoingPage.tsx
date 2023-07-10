import { useState } from "react";
import {
  Button,
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import type { GenCallApi } from "types/api";
import type { Doing } from "types/doing";

type DoingPageProps = {
  doing: Doing;
  genCallApi: GenCallApi;
  genCallApiThenFetchDoing: GenCallApi;
};
export default function DoingPage({
  doing: { id, content, memo: savedMemo, deadline },
  genCallApi,
  genCallApiThenFetchDoing,
}: DoingPageProps) {
  const [finishDoingModalVisible, setFinishDoingModalVisible] = useState(false);
  const openFinishDoingModal = () => setFinishDoingModalVisible(true);
  const closeFinishDoingModal = () => setFinishDoingModalVisible(false);

  const [memo, setMemo] = useState(savedMemo);
  const [timeoutId, setTimeoutId] = useState<0 | NodeJS.Timeout>(0);
  const onMemoChange = (newMemo: string) => {
    setMemo(newMemo);

    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(genSaveMemo(newMemo), 8_000));
  };
  const genSaveMemo = (newMemo: string) => {
    const updateMemo = genCallApi(
      {
        path: `/doings/${id}/memos`,
        method: "PUT",
        body: { memo: newMemo },
      },
      () => setTimeoutId(0)
    );

    return () => {
      if (timeoutId) clearTimeout(timeoutId);

      updateMemo();
    };
  };

  return (
    <>
      <View style={styles.viewerContainer}>
        <View style={styles.viewerTextContainer}>
          <ScrollView>
            <Text style={styles.viewerTextContent}>{content}</Text>
          </ScrollView>
          <Text style={styles.viewerTextDeadline}>
            {`by ${deadline.toString()}`}
          </Text>
        </View>

        <View style={styles.viewerInputContainer}>
          <TextInput
            style={styles.viewerInputMemo}
            placeholder="memo"
            value={memo}
            onChangeText={onMemoChange}
            maxLength={200}
            multiline
          />
        </View>
        {timeoutId ? (
          <Button onPress={genSaveMemo(memo)} title="save memo" />
        ) : (
          <Button onPress={openFinishDoingModal} title="finish doing" />
        )}
      </View>

      {finishDoingModalVisible && (
        <FinishDoingModal
          genCallApiThenFetchDoing={genCallApiThenFetchDoing}
          onRequestClose={closeFinishDoingModal}
          id={id}
          memo={memo}
        />
      )}
    </>
  );
}

type FinishDoingModalProps = {
  genCallApiThenFetchDoing: GenCallApi;
  onRequestClose: () => void;
  id: Doing["id"];
  memo: Doing["memo"];
};
function FinishDoingModal({
  genCallApiThenFetchDoing,
  onRequestClose,
  id,
  memo,
}: FinishDoingModalProps) {
  const finishDoingThenFetchDoing = genCallApiThenFetchDoing(
    {
      path: "/dones",
      method: "POST",
      body: { id },
    },
    onRequestClose
  );

  return (
    <Modal onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalForeground}>
          <Text style={styles.modalTitle}>Finish Doing</Text>

          <ScrollView style={styles.modalTextContainer}>
            <Text style={styles.modalTextMemo}>{memo}</Text>
          </ScrollView>

          <Button onPress={finishDoingThenFetchDoing} title="finish doing" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: "center",
    backgroundColor: "#ecf0f180",
    flex: 1,
    justifyContent: "center",
  },
  modalForeground: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    height: 380,
    padding: 32,
    width: "80%",
  },
  modalTextContainer: {
    borderTopWidth: 1,
    gap: 8,
    height: 220,
    paddingVertical: 16,
  },
  modalTextMemo: {
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewerContainer: {
    flex: 1,
    marginTop: 64,
    width: "80%",
  },
  viewerInputContainer: {
    height: "50%",
    paddingVertical: 16,
  },
  viewerInputMemo: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 6,
  },
  viewerTextContainer: {
    borderBottomWidth: 1,
    gap: 8,
    maxHeight: 130,
    paddingVertical: 16,
  },
  viewerTextContent: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewerTextDeadline: {
    fontSize: 12,
    textAlign: "right",
  },
});
