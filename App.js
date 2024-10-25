import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import PersonScreen from './screen/PersonScreen';
import HomeScreen from './screen/HomeScreen';

export default function App() {
  return (
    //Use Redux
    /*
    <Provider store={store}>
      <PersonScreen/>
    </Provider>
    */

    //Not Redux
    <HomeScreen></HomeScreen>
  );
}