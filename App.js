import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  ToastAndroid,
} from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import Doing from './components/Doing';
import TodoList from './components/TodoList';
import FloatingButtonLayout from './components/FloatingButtonLayout';

export default function App() {
  const [loadingCount, setLoadingCount] = useState(0);
  const genCallApi =
    ({ path, method, headers, body }, callback) =>
    () => {
      setLoadingCount((prev) => prev + 1);

      return fetch(Constants.expoConfig.extra.apiServer + path, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': body ? 'application/json' : undefined,
          ...headers,
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
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
        data.map(({ deadline, ...properties }) => ({
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
        data.map(({ deadline, ...properties }) => ({
          deadline: deadline.slice(0, 10),
          ...properties,
        }))[0]
      );
    }
  );

  useEffect(() => {
    Promise.all([fetchTodoList(), fetchDoing()]);
  }, []);

  const genCallApiThenFetchTodoList = (requestArgs, callback) =>
    genCallApi(requestArgs, () => {
      callback();
      fetchTodoList();
    });

  const genCallApiThenFetchDoing = (requestArgs, callback) =>
    genCallApi(requestArgs, () => {
      callback();
      fetchDoing();
    });

  const genCallApiThenFetchTodoListAndDoing = (requestArgs, callback) =>
    genCallApi(requestArgs, () => {
      callback();
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
          <Doing
            doing={doing}
            genCallApi={genCallApi}
            genCallApiThenFetchDoing={genCallApiThenFetchDoing}
          />
        ) : (
          <TodoList
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
