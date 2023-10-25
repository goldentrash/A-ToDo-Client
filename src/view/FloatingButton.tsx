import { StyleSheet, View, Button } from "react-native";

export type FloatingButtonProps = {
  openModal: () => void;
  title: string;
};
export const FloatingButton = ({ openModal, title }: FloatingButtonProps) => {
  return (
    <View style={styles.floatingButtonContainer}>
      <Button title={title} onPress={openModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    bottom: "12%",
    position: "absolute",
    right: "12%",
  },
});
