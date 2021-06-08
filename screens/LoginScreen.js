import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { onUserLogin } from "../redux/index";
// import { store } from "../redux/index";

const LoginScreen = () => {
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);

  return (
    <View style={styles.container}>
      <Text>Hello Login Screen</Text>
      <TouchableOpacity
        style={{
          height: 60,
          width: 220,
          marginTop: 10,
          backgroundColor: "#FF5733",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          onUserLogin({ email: "test@gmail.com", password: "test" });
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 18 }}>User Login</Text>
      </TouchableOpacity>
      <Text>message: {user?.message}</Text>
      <Text>token: {user?.token}</Text>
    </View>
  );
};

// const mapStateToProps = (state) => ({
//   userReducer: state.userReducer,
// });

// const LoginScreen = connect(mapStateToProps, {
//   onUserLogin,
//   onFetchRestaurants,
// })(_LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
});

export default LoginScreen;
