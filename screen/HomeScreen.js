import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#333",
    marginTop: 3,
  },
});

const fetchSignIn = async ({ username, password }) => {
  console.log(username + ":" + password);
  const response = await axios.post(
    "https://reqres.in/api/login",
    {
      email: username,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = response.data;
  console.log(data);

  return { userName: username, token: data.token };
};

const HomeScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("authen").then((value) => {
      if (value) {
        const authPerson = JSON.parse(value); //Convert to object
        setUserName(authPerson.username);
        setToken(authPerson.token);
      }
      setLoading(false);
    });
  }, []);

  return (
    <View style={{ padding: 15, marginTop: 30 }}>
      {!loading && (
        <>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
            Signin
          </Text>
          {token && (
            <View>
              <Text>Đã login: {username}</Text>
              <Button
                title="Sign Out"
                onPress={() => {
                  AsyncStorage.removeItem("authen").then(() => {
                    setUserName(""), setToken("");
                  });
                }}
              />
            </View>
          )}
          {!token && (
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
                onPress={async () => {
                  setLoading(true);
                  const response = await fetchSignIn({ username, password });
                  setToken(response.token);
                  var obj = { username: username, token: response.token };
                  AsyncStorage.setItem("authen", JSON.stringify(obj));
                  setLoading(false);
                }}
              ></Button>
            </>
          )}
        </>
      )}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
