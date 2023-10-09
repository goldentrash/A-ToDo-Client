import { useState, useMemo } from "react";
import * as Notifications from "expo-notifications";
import { ErrorBoundary } from "react-error-boundary";
import { UserContext, LoadingContext, type User } from "./context";
import { Fallback, Root } from "./view";

Notifications.setNotificationHandler({
  async handleNotification() {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [loadingCount, setLoadingCount] = useState(0);
  const loadingContextValue = useMemo<LoadingContext>(
    () => ({
      startLoading() {
        setLoadingCount((prev) => prev + 1);
      },
      finishLoading() {
        setLoadingCount((prev) => prev - 1);
      },
    }),
    []
  );

  const [user, setUser] = useState<User>(null);
  const userContextValue = useMemo<UserContext>(
    () => ({ user, setUser }),
    [user]
  );

  const isLoading = useMemo(() => loadingCount > 0, [loadingCount]);
  const isLogin = useMemo(() => user !== null, [user]);
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <LoadingContext.Provider value={loadingContextValue}>
        <UserContext.Provider value={userContextValue}>
          <Root isLoading={isLoading} isLogin={isLogin} />
        </UserContext.Provider>
      </LoadingContext.Provider>
    </ErrorBoundary>
  );
}
