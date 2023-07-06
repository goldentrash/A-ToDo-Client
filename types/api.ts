export type GenCallApi = (
  args: RequestArgs,
  callback?: ResponseHandler
) => () => Promise<void>;

type RequestArgs = {
  path: string;
  method: 'GET' | 'POST' | 'PUT';
  headers?: { [key: string]: string };
  body?: { [key: string]: string };
};

type ResponseHandler = (res?: any) => void;
