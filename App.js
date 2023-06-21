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
  const callApi =
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
            ToastAndroid.LONG
          );
        })
        .finally(() => {
          setLoadingCount((prev) => prev - 1);
        });
    };

  const [todoList, setTodoList] = useState([]);
  const fetchTodoList = callApi(
    { path: '/todos', method: 'GET' },
    ({ message, data }) => {
      if (!data) throw new Error(message);
      setTodoList(data);
    }
  );

  const [doing, setDoing] = useState(null);
  const fetchDoing = callApi(
    { path: '/doings', method: 'GET' },
    ({ message, data }) => {
      if (!data) throw new Error(message);
      setDoing(data[0]);
    }
  );

  useEffect(() => {
    Promise.all([fetchTodoList(), fetchDoing()]);
  }, []);

  const callApiThenFetchTodoList = (requestArgs, callback) =>
    callApi(requestArgs, () => {
      callback();
      fetchTodoList();
    });

  const callApiThenFetchTodoListAndDoing = (requestArgs, callback) =>
    callApi(requestArgs, () => {
      callback();
      Promise.all([fetchTodoList(), fetchDoing()]);
    });

  return (
    <View
      style={styles.container}
      pointerEvents={loadingCount === 0 ? 'auto' : 'none'}
    >
      <FloatingButtonLayout callApiThenFetchTodoList={callApiThenFetchTodoList}>
        {doing ? (
          <Doing
            doing={doing}
            callApiThenFetchTodoListAndDoing={callApiThenFetchTodoListAndDoing}
          />
        ) : (
          <TodoList
            todoList={todoList}
            callApiThenFetchTodoListAndDoing={callApiThenFetchTodoListAndDoing}
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
