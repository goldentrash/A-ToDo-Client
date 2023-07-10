export type GenCallApi = (
  args: RequestArgs,
  callback?: ResponseHandler
) => () => Promise<void>;

type RequestArgs = {
  path: string;
  method: "GET" | "POST" | "PUT";
  headers?: { [key: string]: string };
  body?: { [key: string]: string };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseHandler = (res?: any) => void;
