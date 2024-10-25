import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import PersonScreen from "./screen/PersonScreen";
import HomeScreen from "./screen/HomeScreen";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    //Use Redux

    <Provider store={store}>
      {/*PersistGate dam bao store dc khoi phuc tu storage truoc khi UI dc render*/
      /*Persist gate tri hoan render UI cho den khi redux store dc khoi phuc hoan toan */
      }
      
      <PersistGate persistor={persistor}>
        <PersonScreen />
      </PersistGate>
    </Provider>

    //Not Redux
    //<HomeScreen></HomeScreen>
  );
}
