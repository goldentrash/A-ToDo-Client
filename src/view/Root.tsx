import { StyleSheet, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { type User } from "../context";
import { AuthPage, UserMenu } from "../container";

type RootProps = {
  isLoading: boolean;
  user: User | null;
};
export const Root = ({ isLoading, user }: RootProps) => {
  return (
    <View style={styles.container} pointerEvents={isLoading ? "none" : "auto"}>
      {user ? <UserMenu /> : <AuthPage />}

      {isLoading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator />
        </View>
      )}

      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: "#ecf0f180",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: "20%",
  },
});
