import { Text } from "react-native";

type FallbackProps = {
  error: Error;
};

export const Fallback = ({ error }: FallbackProps) => {
  return <Text>{error.message}</Text>;
};
