import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "../redux/personSlice";
import { fetchSignIn } from "../redux/authSlice";

const PersonScreen = () => {
  const dispatch = useDispatch();
  const lstPerson = useSelector((state) => state.person.lstPerson);
  const currentPage = useSelector((state) => state.person.currentPage);
  const totalPage = useSelector((state) => state.person.totalPage);
  useEffect(() => {
    dispatch(fetchPerson(1));
  }, []);

  //Login
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loggedUserName = useSelector((state) => state.auth.userName);
  return (
    <>
      <View style={{ paddingTop: 50, paddingHorizontal: 15, height: 300 }}>
        <FlatList
          data={lstPerson}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text>{item.email}</Text>
              </View>
            </View>
          )}
          onEndReached={() => {
            if (currentPage < totalPage) {
              dispatch(fetchPerson(currentPage + 1));
            }
          }}
        />
      </View>

      <View style={{ padding: 15, marginTop: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Signin</Text>
        {loggedUserName && (
          <View>
            <Text>Đã login: {loggedUserName}</Text>
          </View>
        )}
        {!loggedUserName && (
          <>
            <View>
              <Text>Username</Text>
              <TextInput
                value={username}
                onChangeText={(value) => setUserName(value)}
                placeholder="Please enter username"
              />
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholder="Enter password here"
              />
            </View>
            <Button
              title="Login"
              onPress={() => {
                dispatch(fetchSignIn({ username, password }));
              }}
            ></Button>
          </>
        )}
      </View>
    </>
  );
};

export default PersonScreen;
