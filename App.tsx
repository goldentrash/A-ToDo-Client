import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  ToastAndroid,
} from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import DoingPage from './components/DoingPage';
import TodoListPage from './components/TodoListPage';
import FloatingButtonLayout from './components/FloatingButtonLayout';
import type { GenCallApi } from './types/api';
import type { Doing } from './types/doing';
import type { Todo } from './types/todo';

export default function App() {
  const [loadingCount, setLoadingCount] = useState(0);
  const genCallApi: GenCallApi =
    ({ path, method, headers, body }, callback) =>
    () => {
      setLoadingCount((prev) => prev + 1);

      if (body)
        headers = Object.assign(headers ?? {}, {
          'Content-Type': 'application/json',
        });
      return fetch(Constants.expoConfig!.extra!.apiServer + path, {
        method,
        headers: {
          Accept: 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status.toString());
          return res.json();
        })
        .then(callback)
        .catch((err) => {
          ToastAndroid.show(
            'fail to fetch, please try again later',
            ToastAndroid.SHORT
          );
        })
        .finally(() => {
          setLoadingCount((prev) => prev - 1);
        });
    };

  const [todoList, setTodoList] = useState([]);
  const fetchTodoList = genCallApi(
    { path: '/todos', method: 'GET' },
    ({ message, data }) => {
      if (!data) throw new Error(message);

      setTodoList(
        data.map(({ deadline, ...properties }: Todo) => ({
          deadline: deadline.slice(0, 10),
          ...properties,
        }))
      );
    }
  );

  const [doing, setDoing] = useState(null);
  const fetchDoing = genCallApi(
    { path: '/doings', method: 'GET' },
    ({ message, data }) => {
      if (!data) throw new Error(message);

      setDoing(
        data.map(({ deadline, ...properties }: Doing) => ({
          deadline: deadline.slice(0, 10),
          ...properties,
        }))[0]
      );
    }
  );

  useEffect(() => {
    Promise.all([fetchTodoList(), fetchDoing()]);
  }, []);

  const genCallApiThenFetchTodoList: GenCallApi = (requestArgs, callback) =>
    genCallApi(requestArgs, () => {
      callback?.();
      fetchTodoList();
    });

  const genCallApiThenFetchDoing: GenCallApi = (requestArgs, callback) =>
    genCallApi(requestArgs, () => {
      callback?.();
      fetchDoing();
    });

  const genCallApiThenFetchTodoListAndDoing: GenCallApi = (
    requestArgs,
    callback
  ) =>
    genCallApi(requestArgs, () => {
      callback?.();
      Promise.all([fetchTodoList(), fetchDoing()]);
    });

  return (
    <View
      style={styles.container}
      pointerEvents={loadingCount === 0 ? 'auto' : 'none'}
    >
      <FloatingButtonLayout
        genCallApiThenFetchTodoList={genCallApiThenFetchTodoList}
      >
        {doing ? (
          <DoingPage
            doing={doing}
            genCallApi={genCallApi}
            genCallApiThenFetchDoing={genCallApiThenFetchDoing}
          />
        ) : (
          <TodoListPage
            todoList={todoList}
            genCallApiThenFetchTodoListAndDoing={
              genCallApiThenFetchTodoListAndDoing
            }
          />
        )}
      </FloatingButtonLayout>

      <StatusBar style="auto" />

      {loadingCount !== 0 && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activityIndicatorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#ecf0f180',
  },
});
