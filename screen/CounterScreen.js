import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/counterSlice";
import { advIncrement } from "../redux/advancedSlide";
import MyButton from "../component/MyButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

const CounterScreen = () => {
  const count = useSelector((state)=> state.counter.value);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>{count}</Text>

      <Button title="+" onPress={()=>{
        dispatch(increment());
      }}/>

      <Button title="Add+=2" onPress={()=>{
        dispatch(advIncrement());
      }}/>
    </View>
  );
};

export default CounterScreen;
