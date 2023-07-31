import { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";

// 여기에만 헤더에다 todo list같은거 써두고 (있어야 할 듯)
// 옆에 로그아웃 버튼 만들어둘까?
// doing 중에는 로그아웃 하지 말란거임 ㅋㅋㅋ

export const WaitingPage = () => {
  return <Text>waiting page</Text>;
  // const [startTodoModalVisible, setStartTodoModalVisible] = useState(false);
  // const openStartTodoModal = () => setStartTodoModalVisible(true);
  // const closeStartTodoModal = () => setStartTodoModalVisible(false);

  // const [watchingTodo, setWatchingTodo] = useState<null | Todo>(null);
  // const renderTodo = ({ item: todo }: { item: Todo }) => {
  //   const { content, deadline } = todo;
  //   const watchTodo = () => {
  //     setWatchingTodo(todo);
  //     openStartTodoModal();
  //   };

  //   return (
  //     <Pressable style={styles.listItem} onPress={watchTodo}>
  //       <Text style={styles.listItemTextContent}>{content}</Text>
  //       <Text
  //         style={styles.listItemTextDeadline}
  //       >{`by ${deadline.toString()}`}</Text>
  //     </Pressable>
  //   );
  // };

  // return (
  //   <>
  //     <FlatList
  //       style={styles.listContainer}
  //       data={todoList}
  //       renderItem={renderTodo}
  //     />

  //     {startTodoModalVisible && (
  //       <StartTodoModal
  //         genCallApiThenFetchTodoListAndDoing={
  //           genCallApiThenFetchTodoListAndDoing
  //         }
  //         onRequestClose={closeStartTodoModal}
  //         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //         watchingTodo={watchingTodo!}
  //       />
  //     )}
  //   </>
  // );
};

// type StartTodoModalProps = {
//   genCallApiThenFetchTodoListAndDoing: GenCallApi;
//   onRequestClose: () => void;
//   watchingTodo: Todo;
// };
// function StartTodoModal({
//   genCallApiThenFetchTodoListAndDoing,
//   onRequestClose,
//   watchingTodo: { id, content, deadline },
// }: StartTodoModalProps) {
//   const startTodoThenFetchTodoList = genCallApiThenFetchTodoListAndDoing(
//     { path: "/doings", method: "POST", body: { id } },
//     onRequestClose
//   );

//   return (
//     <Modal onRequestClose={onRequestClose}>
//       <View style={styles.modalBackground}>
//         <View style={styles.modalForeground}>
//           <Text style={styles.modalTitle}>Start Todo</Text>

//           <View style={styles.modalTextContainer}>
//             <ScrollView>
//               <Text style={styles.modalTextContent}>{content}</Text>
//             </ScrollView>
//             <Text style={styles.modalTextDeadline}>
//               {`by ${deadline.toString()}`}
//             </Text>
//           </View>

//           <Button onPress={startTodoThenFetchTodoList} title="start todo" />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   listContainer: {
//     flex: 1,
//     marginTop: 64,
//     maxHeight: "75%",
//     width: "80%",
//   },
//   listItem: {
//     borderColor: "black",
//     borderRadius: 6,
//     borderWidth: 1,
//     margin: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   listItemTextContent: {
//     fontSize: 16,
//   },
//   listItemTextDeadline: {
//     fontSize: 12,
//     textAlign: "right",
//   },
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
//   modalTextContent: {
//     fontSize: 16,
//   },
//   modalTextDeadline: {
//     fontSize: 12,
//     textAlign: "right",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
