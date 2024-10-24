import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import PersonScreen from './screen/PersonScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PersonScreen/>
    </Provider>
  );
}