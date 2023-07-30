import { useState, useMemo } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { StatusBar } from "expo-status-bar";
import { LoadingContext, UserContext } from "src/contexts";
import type { User } from "src/contexts";
import { DoingPage, TodoListPage } from "src/containers";
import { Fallback } from "src/components/Fallback";

export default function App() {
  const [loadingCount, setLoadingCount] = useState(0);
  const loadingContextValue = useMemo(
    () => ({
      loadingCount,
      setLoadingCount,
    }),
    [loadingCount, setLoadingCount]
  );
  const isLoading = useMemo(() => loadingCount > 0, [loadingCount]);

  const [user, setUser] = useState<User | null>(null);
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <LoadingContext.Provider value={loadingContextValue}>
        <UserContext.Provider value={userContextValue}>
          <View
            style={styles.container}
            pointerEvents={isLoading ? "none" : "auto"}
          >
            {(() => {
              if (!user) return <View />; // auth

              switch (user.state) {
                case "rest":
                  return <TodoListPage />;
                case "working":
                  return <DoingPage />;
                default:
                  return ((_: never): never => {
                    throw Error("something went wrong");
                  })(user);
              }
            })()}

            {isLoading && (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator />
              </View>
            )}

            <StatusBar style="dark" />
          </View>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </ErrorBoundary>
  );
}

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
  },
});
