import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  ToastAndroid,
} from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import TodoList from './components/TodoList';

export default function App() {
  const [loadingCount, setLoadingCount] = useState(0);
  const [todoList, setTodoList] = useState([]);

  const fetchTodoList = () => {
    setLoadingCount((prev) => prev + 1);

    fetch(Constants.expoConfig.extra.apiServer + '/todos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);

        return res.json();
      })
      .then((body) => {
        const { message, data } = body;
        if (!data) throw new Error(message);

        setTodoList(data);
      })
      .catch((err) => {
        ToastAndroid.show(
          'fail to fetch todo list, please re-start application',
          ToastAndroid.LONG
        );
      })
      .finally(() => {
        setLoadingCount((prev) => prev - 1);
      });
  };

  useEffect(fetchTodoList, []);

  return (
    <View
      style={styles.container}
      pointerEvents={loadingCount === 0 ? 'auto' : 'none'}
    >
      <TodoList todoList={todoList} />
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
