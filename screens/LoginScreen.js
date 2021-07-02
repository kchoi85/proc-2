import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

import { icons, COLORS, SIZES, FONTS, images } from "../constants";

import { store } from "../redux/index";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [id, setId] = React.useState("");
  const [pass, setPass] = React.useState("");

  const { user, appError, userLoggedIn } = useSelector(
    (state) => state.userReducer
  );

  // if user logs in successfully, userLoggedin == true.
  // since this code is re-run, we check if userLoggedin==true
  // if true, go back to account page
  React.useEffect(() => {
    if (userLoggedIn) {
      navigation.goBack();
    }
  });

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 60,
          borderBottomWidth: 0.5,
          borderBottomColor: "grey",
          backgroundColor: "white",
        }}
      >
        <View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 200,
              borderTopEndRadius: 200,
              height: 40,
              width: 40,
              backgroundColor: "white",
              marginLeft: SIZES.padding * 2,
              marginTop: SIZES.padding,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              height: 40,
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 200,
              backgroundColor: "white",
              marginHorizontal: SIZES.padding * 7,
              marginTop: SIZES.padding,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Client Login</Text>
          </View>
        </View>
      </View>
    );
  }

  const onUserLogin = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://192.168.2.12:4000/users/loginUser",
        {
          email,
          password,
        }
      );
      store.dispatch({ type: "DO_LOGIN", payload: response.data });
    } catch (error) {
      store.dispatch({ type: "ON_ERROR", payload: error });
    }
  };

  function renderLogin() {
    return (
      <View style={styles.body}>
        <View>
          <TextInput
            style={styles.creds}
            onChangeText={setId}
            placeholder="Email Address"
          />
          <TextInput
            style={styles.creds}
            onChangeText={setPass}
            placeholder="Password"
            // autoCompleteType={"off"}
            // autoCorrect={"false"}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              onUserLogin({ email: id, password: pass });

              //   setTimeout(() => {
              //     navigation.goBack();
              //   }, 2000);
            }}
          >
            <Text style={{ color: "#FFF" }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={{ color: "#FFF" }}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.credInfo}>
          <Text>message: {user?.message}</Text>
          <Text>_id: {user?._id}</Text>
          <Text>token: {user?.token}</Text>
          <Text>error: {appError?.message}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderLogin()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  body: {
    paddingLeft: SIZES.padding * 3,
    paddingRight: SIZES.padding * 3,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "white",
  },
  creds: {
    borderBottomWidth: 1,
    marginBottom: 3,
    marginTop: 20,
  },
  credInfo: {
    paddingTop: 20,
    color: "grey",
  },
  buttonLogin: {
    height: 30,
    width: 110,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonRegister: {
    height: 30,
    width: 110,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 5,
  },
});
