import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "../redux/personSlice";

const PersonScreen = () => {
  const dispatch = useDispatch();
  const lstPerson = useSelector((state) => state.person.lstPerson);
  const currentPage = useSelector((state) => state.person.currentPage);
  const totalPage = useSelector((state)=> state.person.totalPage);
  useEffect(() => {
    dispatch(fetchPerson(1));
  }, []);
  return (
    <View style={{ paddingTop: 50, paddingHorizontal:15, height: 300 }}>
      <FlatList
        data={lstPerson}
        keyExtractor={(item, index)=>item.id}
        renderItem={({ item }) => (
          <View style={{marginBottom: 20}}>
            <View>
              <Text style={{fontSize:18, fontWeight:'bold'}}>{item.first_name} {item.last_name}</Text>
              <Text>{item.email}</Text>
            </View>
          </View>
        )}
        onEndReached={()=>{
          if(currentPage< totalPage)
          {
            console.log(currentPage + "-"+ totalPage)
            dispatch(fetchPerson(currentPage+1));
          }
        }}
      />
    </View>
  );
};

export default PersonScreen;
