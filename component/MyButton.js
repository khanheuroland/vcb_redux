import React from "react";
import { Button } from "react-native";
import { useDispatch } from "react-redux";
import { decrement, incrementByAmount } from "../redux/counterSlice";

const MyButton = () => {
  const dispatch = useDispatch();
  return (
    <>
    <Button
      title="-"
      onPress={() => {
        dispatch(decrement());
      }}
    />
    
    <Button title="Add" onPress={()=>{
        dispatch(incrementByAmount(10));
    }}></Button>
    </>
  );
};

export default MyButton;
