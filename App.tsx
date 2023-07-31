import { useState, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingContext, UserContext } from "./src/context";
import { type User } from "./src/context";
import { Fallback, Root } from "./src/view";

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
          <Root isLoading={isLoading} user={user} />
        </UserContext.Provider>
      </LoadingContext.Provider>
    </ErrorBoundary>
  );
}
