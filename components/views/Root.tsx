import { StyleSheet, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLOR_SHADOWED, COLOR_BACKGROUND } from "../../constants";
import { AuthPage } from "../controllers/AuthPage";
import { UserMenu } from "../controllers/UserMenu";

type RootProps = {
  isLoading: boolean;
  isLogin: boolean;
};
export const Root = ({ isLoading, isLogin }: RootProps) => {
  return (
    <View style={styles.container} pointerEvents={isLoading ? "none" : "auto"}>
      {isLogin ? <UserMenu /> : <AuthPage />}

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
    backgroundColor: COLOR_SHADOWED,
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  container: {
    alignItems: "center",
    backgroundColor: COLOR_BACKGROUND,
    flex: 1,
    paddingTop: "20%",
  },
});
