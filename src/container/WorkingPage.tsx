import { useState, useCallback, useContext, useRef } from "react";
import {
  Button,
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { UserContext, type Doing } from "../context";
import { useApi } from "../hook";

export const WorkingPage = () => {
  return <Text>working page</Text>;
  //   const { user, setUser } = useContext(UserContext);
  //   if (user?.state !== "working") throw Error("something went wrong");
  //   const { content, deadline } = user.doing;
  //   const [memo, setMemo] = useState(user.doing.memo);
  //   const saveMemo = useApi(
  //     {
  //       path: `/doings/${user.doing.id}/memo`,
  //       method: "PUT",
  //       body: { memo },
  //     },
  //     (res) => {},
  //     (err) => {}
  //   );
  //   const [isMemoUpToDate, setIsMemoUpToDate] = useState(true);
  //   const onMemoChange = useCallback(
  //     (newMemo: string) => {
  //       setIsMemoUpToDate(false);
  //       setMemo(newMemo);
  //     },
  //     [setMemo, setIsMemoUpToDate]
  //   );
  //   useUpdateEffect(() => {
  //     if (!saveMemoError) return;
  //     // do error handling
  //   }, [saveMemoError]);
  //   useUpdateEffect(() => {
  //     setIsMemoUpToDate(true);
  //   }, [saveMemoResponse, setIsMemoUpToDate]);
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const openModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  //   const closeModal = useCallback(
  //     () => setModalVisible(false),
  //     [setModalVisible]
  //   );
  //   const [finishDoing, finishDoingResponse, finishDoingError] = useApi({
  //     path: "/dones",
  //     method: "POST",
  //     body: { id: user.doing.id },
  //   });
  //   useUpdateEffect(() => {
  //     if (!finishDoingError) return;
  //     // do error handling
  //   }, [finishDoingError]);
  //   useUpdateEffect(() => {
  //     setUser({ ...user, state: "rest" });
  //   }, [finishDoingResponse, setUser]);
  //   const memoInputRef = useRef<null | TextInput>(null);
  //   return (
  //     <>
  //       <View style={styles.viewerContainer}>
  //         <View style={styles.viewerTextContainer}>
  //           <ScrollView>
  //             <Text style={styles.viewerTextContent}>{content}</Text>
  //           </ScrollView>
  //           <Text style={styles.viewerTextDeadline}>
  //             {
  //               `by ${deadline.toString()}` // 여기에 tagged literal?
  //             }
  //           </Text>
  //         </View>
  //         <View style={styles.viewerInputContainer}>
  //           <TextInput
  //             ref={memoInputRef}
  //             style={styles.viewerInputMemo}
  //             placeholder="memo"
  //             value={memo}
  //             onChangeText={onMemoChange}
  //             maxLength={200}
  //             multiline
  //           />
  //         </View>
  //         {isMemoUpToDate ? (
  //           <Button onPress={openModal} title="finish doing" />
  //         ) : (
  //           <Button
  //             onPress={() => {
  //               saveMemo();
  //               memoInputRef.current?.blur();
  //             }}
  //             title="save memo"
  //           />
  //         )}
  //       </View>
  //       {modalVisible && (
  //         <FinishDoingModal
  //           onSubmit={finishDoing}
  //           onRequestClose={closeModal}
  //           doing={user.doing}
  //         />
  //       )}
  //     </>
  // );
};

// // 그냥 start todo랑 fisnish doing을 alert로 대체하는건 어떨까?
// // 아니면 진짜 stateful 하게 만들어보던가
// type FinishDoingModalProps = {
//   onSubmit: () => Promise<void>;
//   onRequestClose: () => void;
//   doing: Doing;
// };
// function FinishDoingModal({
//   onSubmit,
//   onRequestClose,
//   doing,
// }: FinishDoingModalProps) {
//   return (
//     <Modal onRequestClose={onRequestClose}>
//       <View style={styles.modalBackground}>
//         <View style={styles.modalForeground}>
//           <Text style={styles.modalTitle}>Finish {doing.content}</Text>

//           <ScrollView style={styles.modalTextContainer}>
//             <Text style={styles.modalTextMemo}>{doing.memo}</Text>
//           </ScrollView>

//           <Button onPress={onSubmit} title="finish doing" />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalBackground: {
//     alignItems: "center",
//     backgroundColor: "#ecf0f180",
//     flex: 1,
//     justifyContent: "center",
//   },
//   modalForeground: {
//     backgroundColor: "#ffffff",
//     borderRadius: 8,
//     borderWidth: 1,
//     gap: 12,
//     height: 380,
//     padding: 32,
//     width: "80%",
//   },
//   modalTextContainer: {
//     borderTopWidth: 1,
//     gap: 8,
//     height: 220,
//     paddingVertical: 16,
//   },
//   modalTextMemo: {
//     fontSize: 16,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   viewerContainer: {
//     flex: 1,
//     marginTop: 64,
//     width: "80%",
//   },
//   viewerInputContainer: {
//     height: "50%",
//     paddingVertical: 16,
//   },
//   viewerInputMemo: {
//     borderRadius: 4,
//     borderWidth: 1,
//     padding: 6,
//   },
//   viewerTextContainer: {
//     borderBottomWidth: 1,
//     gap: 8,
//     maxHeight: 130,
//     paddingVertical: 16,
//   },
//   viewerTextContent: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   viewerTextDeadline: {
//     fontSize: 12,
//     textAlign: "right",
//   },
// });
